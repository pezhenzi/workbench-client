import React, {Component} from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function uploadImageCallBack(file) {
    return new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://10.10.60.47:3000/card/upload-file');
            xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        }
    );
}

class ArticleEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    onEditorStateChange(editorState){
        this.setState({
            editorState,
        }, () => {console.log(this.state.editorState)});
    };

    render() {
        const { editorState } = this.state;
        return (
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange.bind(this)}
                toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                }}
                localization={{
                    locale: 'zh',
                }}
            />
        );
    }
}

export default ArticleEditor;