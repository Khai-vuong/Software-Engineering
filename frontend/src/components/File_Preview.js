import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

function FilePreview({ docs }){
    return (
        <DocViewer
            documents={docs}
        />
        
    );
}

export default FilePreview;
