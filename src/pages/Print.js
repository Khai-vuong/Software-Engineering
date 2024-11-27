import "../components/css/Printer.css";
import '../components/css/Hero.css';
import folder from "../assets/images/folder.png"
import upload from "../assets/images/upload.png"
import "bootstrap-icons/font/bootstrap-icons.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Not_Error from '../assets/images/Not_Error.png';
import Error from '../assets/images/Error.png'
import React, {useRef,useState,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Print() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';  // Disable scroll

        // Cleanup: restore scroll behavior when the component unmounts or changes
        return () => {
            document.body.style.overflow = 'auto';  // Enable scroll again
        };
    }, []);
    // Định dạng thêm ở đây nên đồng nhất với định dạng bên spso cập nhật
    const fileIconMap = {
        pdf: "bi bi-filetype-pdf",
        png: "bi bi-filetype-png",
        docx: "bi bi-filetype-docx",
        csv: "bi bi-filetype-csv",
        txt: "bi bi-filetype-txt",
        // Add more extensions and their corresponding icons here
    };
    // Logic để xử lý icon ảnh
    const getFileIconClass = (filename) => {
        const extension = filename.split('.').pop().toLowerCase(); // Extract file extension
        return fileIconMap[extension] || null; // Default icon if no match
    };
    const navigate = useNavigate(); 
    const fileInputRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [unsupportedFile, setUnsupportedFile] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);

    // File nếu > 100 MB thì không thể upload lên được, hiện thanh upload error
    // Tránh tình trạng upload file lớn quá database chịu không được
    const MAX_FILE_SIZE_MB = 100 * 1024 * 1024; 

    const handleChange = (event) =>{
        // do something with event data
        const file = event.target.files[0];
        if (!file) return;
        const iconClass = getFileIconClass(file.name);
        if (!iconClass) {
            // Show modal for unsupported file types
            setUnsupportedFile(file.name);
            setShowModal(true);
            event.target.value = "";
            return;
        }

        if (file.size > MAX_FILE_SIZE_MB) {
            // File too large
            const largeFile = {
                id: Date.now(),
                name: getDisplayName(file.name),
                icon: getFileIconClass(file.name),
                progress: 0,
                status: 'Error',
                error: true,
            };
            setUploadedFiles((prevFiles) => [...prevFiles, largeFile]);
            event.target.value = "";
            return;
        }

        if (file) {
            const newFile = {
                id: Date.now(),
                name: getDisplayName(file.name),
                icon:getFileIconClass(file.name),
                progress: 0, // Simulated progress
                status: 'Uploading', // You can change this based on actual upload logic
                error: false // Set true if there’s an error
                };
            setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
            simulateUploadProgress(newFile.id);
        }
        event.target.value = "";
    };
    
    // Giả lập thanh chạy progress, mấy ông backend muốn sửa cũng được không thì để
    // Nó chạy 3s từ 0 -> 30 -> 60 -> 100 (có thể chỉnh ở dưới)
    const simulateUploadProgress = (fileId) => {
        const updateProgress = (progress, status) => {
            setUploadedFiles((prevFiles) =>
                prevFiles.map((file) =>
                    file.id === fileId
                        ? { ...file, progress, status }
                        : file
                )
            );
        };

        // Progress steps with delays
        setTimeout(() => updateProgress(30, 'Uploading'), 1000); // After 1 second, progress = 30%
        setTimeout(() => updateProgress(60, 'Uploading'), 2000); // After 2 seconds, progress = 60%
        setTimeout(() => updateProgress(100, 'Completed'), 3000); // After 3 seconds, progress = 100%
    };

    // Tên file nếu quá 30 chữ thì sẽ được thu gọn lại
    const getDisplayName = (name) => {
        const MAX_START_LENGTH = 15; // Number of characters to keep at the start
        const MAX_END_LENGTH = 10; // Number of characters to keep at the end
    
        if (name.length <= MAX_START_LENGTH + MAX_END_LENGTH + 3) {
            // If the name is short enough, return it as is
            return name;
        }
    
        const extensionIndex = name.lastIndexOf('.');
        const extension = name.substring(extensionIndex); // Extract the file extension
        const baseName = name.substring(0, extensionIndex); // Exclude the file extension
    
        const startPart = baseName.substring(0, MAX_START_LENGTH); // First 15 characters
        const endPart = baseName.substring(baseName.length - MAX_END_LENGTH); // Last 10 characters
    
        return `${startPart}...${endPart}${extension}`;
    };
    // Modal Pop up nếu sai định dạng
    const closeModal = () => setShowModal(false);
    const handleSetupClick = () => {
        navigate('/setup'); // Navigate to the print config page
      };
    return (
        <section id="hero" className="block hero-block" style={{ margin: '70px 50px 0'}}>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
            <div class="printer-parent container" style={{ display: 'flex', gap: '50px'}}>
            <div class="col-mb-2 printer">
                    <div class="container content-header">
                        <div class="row header">Tải tài liệu</div>
                        <div class="row normal-font">Tải lên tài liệu cần in</div>
                    </div> 
                    <div class ="container" style={{ display: "flex", alignItems: "center", marginLeft:"10px"}}>
                        <div class="col"> 
                        <img src={folder} alt="" style={{ marginRight: "10px" }}></img>
                            </div>
                        <div class="col normal-font"> 
                        Tập tin
                        </div>
                        <div class="col-9">

                        </div>
                    </div>
                    <div class="container upload-file-container content-header">
                        <div class="row">
                        <img src={upload} alt="" ></img>
                        </div>
                        <div class="row normal-font" style={{marginBottom:"10px"}}>
                        Thêm tập tin
                        </div>
                        <div class="row">

                        <button onClick={()=>fileInputRef.current.click()} >Chọn tài liệu</button>
                        <input onChange={handleChange} multiple={false} ref={fileInputRef} type='file'hidden/>
                        </div>
                    </div>
            </div>
            <div class = "col">
                <div class = "header" style={{color:"black"}}>
                    Tài liệu đã tải lên
                </div>

                {/* Từ đây trở xuống là danh sách File */}
                {/* Đây là File 1*/}
                <div style={{ height: '55%', overflowY: 'auto', paddingRight: '10px' }}>
                {uploadedFiles.map((file) => (
                <div key={file.id} style={{ display: 'flex', alignItems: 'center', gap:'10px'}}>
                    <i class={file.icon} style={{ fontSize: '60px' }}></i>
                    <div class="" style={{ flexGrow: 1, marginLeft: '10px', Width:'100%'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>   
                            <div class="file_name">{file.name}</div>
                            <div class={file.error ? 'Error' : 'Not_Error'}>{file.status}</div>
                        </div> 
                        <ProgressBar now={file.progress} style={{ Width:'100%'}}/>
                    </div>
                    <div>
                    <img src={file.error ? Error : Not_Error} alt=""></img>
                    </div>
                </div>
                ))}
                </div>
                {/* Đây là File 2*/}


                <div style={{display:"flex", justifyContent:"center", marginTop:"5%"}}>
                <button type="submit" class="btn btn-success" onClick={handleSetupClick}>Thiết lập trang in</button>
                </div>
            </div>
            </div>
            </div>
            <Modal show={showModal} onHide={closeModal} style={{marginTop:"15%"}}> 
                <Modal.Header closeButton>
                    <Modal.Title>Unsupported File Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    The file <strong>{unsupportedFile}</strong> is not supported. Please upload a valid file type.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </section>
    );
}

export default Print;