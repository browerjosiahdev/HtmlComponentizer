// TODO: Fix issue where this doesn't work when HTML tags have attributes.
class HtmlComponentizer extends React.Component {
    constructor(props) {
        super(props);

        this.handleRenderChild = this.renderChild.bind(this);

        this.state = { htmlChildren: null };
        this.TagName = (this.props.tag || 'span');
    }
    /**
     * Component methods
     */
    componentDidMount() {
        this.process(this.props.content);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.content !== this.props.content) {
            this.process(this.props.content);
        }
    }
    /**
     * Misc. methods
     */
    generateMatches(content) {
        const MatchComponent = this.props.component;
        let htmlChildren = [];

        if (typeof MatchComponent === 'function' && typeof content === 'string' && content.length && this.props.match instanceof RegExp) {
            const contentList = content.split('');
            const matches = content.match(this.props.match);

            if (matches) {
                for (let i = 0; i < matches.length; i++) {
                    const match = matches[i];
                    const currentContent = contentList.join('');

                    const textContent = contentList.splice(0, currentContent.indexOf(match)).join('');

                    htmlChildren.push({
                        props: { dangerouslySetInnerHTML: { __html: textContent } },
                        tag: 'span'
                    });

                    htmlChildren.push({
                        props: { matchIndex: i, value: match },
                        spread: ['componentProps'],
                        tag: MatchComponent
                    });

                    contentList.splice(0, match.length);
                }

                if (contentList.length) {
                    const textContent = contentList.join('');

                    htmlChildren.push({
                        props: { dangerouslySetInnerHTML: { __html: textContent } },
                        tag: 'span'
                    });
                }
            } else {
                htmlChildren.push({
                    props: { dangerouslySetInnerHTML: { __html: content } },
                    tag: 'span'
                });
            }
        }

        return htmlChildren;
    }
    process(content) {
        if (typeof content === 'string' && content.length) {
            let htmlChildren = [];

            if (/<(.*?)([^/])>/.test(content)) {
                let contentList = content.split('');
                let isTag = false;
                let fillerContent = '';

                 // Get the tag name of the current tag and remove
                 // excess characters.
                const getTagName = () => {
                    let tagName = '';

                    while (contentList[0] !== ' ' && contentList[0] !== '>' && contentList[0] !== '/' && contentList.length) {
                        tagName += contentList.shift();
                    }

                    removeClosing();

                    return tagName;
                };
                const removeClosing = () => {
                    while (contentList[0] !== '>' && contentList.length) {
                        contentList.shift();
                    }

                    if (contentList[0] === '>') {
                        contentList.shift();
                    }
                };

                 // Add the current filler content to the child list.
                const addFillerContent = () => {
                    if (fillerContent.length) {
                        htmlChildren.push({
                            props: { content: fillerContent, tag: 'span' },
                            spread: [''],
                            tag: HtmlComponentizer
                        });

                        fillerContent = '';
                    }
                };

                const isCurrentText = (value) => {
                    return (contentList.slice(0, value.length).join('') === value);
                };

                 // Check to see if the current tag is a valid tag.
                const isValidTag = () => {
                    const ignoredTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'video', 'vr', 'wbr'];

                    if (ignoredTags.find(tag => isCurrentText(`<${tag}`))) {
                        return false;
                    }

                    return true;
                };

                while (contentList.length) {
                    if (contentList[0] === '<' && isValidTag()) {
                        contentList.shift();

                        addFillerContent();

                        let tagName = getTagName();
                        let tagContent = '';
                        let tagCount = 1;
                        let isTagOpen = true;

                        while (isTagOpen && contentList.length) {
                            if (contentList[0] === '<' && isValidTag()) {
                                contentList.shift();

                                const isSubtagClosing = (contentList[0] === '/');

                                if (isSubtagClosing) {
                                    contentList.shift();
                                }

                                let subtagName = getTagName();

                                if (subtagName === tagName) {
                                    if (isSubtagClosing) {
                                        tagCount--;

                                        if (tagCount <= 0) {
                                            isTagOpen = false;
                                        }
                                    } else {
                                        tagCount++;
                                    }
                                }

                                if (isTagOpen) {
                                    tagContent += `<${isSubtagClosing ? '/' : ''}${subtagName}>`;
                                }
                            } else {
                                tagContent += contentList.shift();
                            }
                        }

                        htmlChildren.push({
                            props: { content: tagContent, tag: tagName },
                            spread: [''],
                            tag: HtmlComponentizer
                        });
                    } else {
                        fillerContent += contentList.shift();
                    }
                }

                addFillerContent();
            } else {
                htmlChildren = this.generateMatches(content);
            }

            this.setState({ htmlChildren });
        }
    }
    /**
     * Render methods
     */
    renderChild(child, index) {
        const Tag = child.tag;
        let childProps = {};

        if (child.spread && child.spread.length) {
            for (let i = 0; i < child.spread.length; i++) {
                const spread = child.spread[i];

                if (spread === '') {
                    childProps = Object.assign(childProps, this.props);
                } else if (this.props[spread] && typeof this.props[spread] === 'object') {
                    childProps = Object.assign(childProps, this.props[spread]);
                }
            }
        }

        if (child.props) {
            childProps = Object.assign(childProps, child.props);
        }

        return <Tag {...childProps} />;
    }
    render() {
        return (
            <this.TagName>
                {this.state.htmlChildren ? this.state.htmlChildren.map(this.handleRenderChild) : null}
            </this.TagName>
        );
    }
}

export default HtmlComponentizer;
