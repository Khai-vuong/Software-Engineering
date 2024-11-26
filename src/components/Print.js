import "../components/css/Printer.css";
import '../components/css/Hero.css';
import folder from "../assets/images/folder.png"
import upload from "../assets/images/upload.png"
import "bootstrap-icons/font/bootstrap-icons.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Not_Error from '../assets/images/Not_Error.png';
import Error from '../assets/images/Error.png'

function Print() {
    return (
        <section id="hero" className="block hero-block" style={{ margin: '70px 50px 0' }}>
            <div class="printer-parent container" style={{ display: 'flex', gap: '50px' }}>
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
                        <button type="submit" >Chọn tài liệu</button>
                        </div>
                    </div>
            </div>
            <div class = "col" >
                <div class = "header" style={{color:"black"}}>
                    Tài liệu đã tải lên
                </div>

                {/* Từ đây trở xuống là danh sách File */}
                {/* Đây là File 1*/}
                <div class="" style={{ display: 'flex', alignItems: 'center', gap:'10px'}}>
                    <i class="bi bi-filetype-pdf" style={{ fontSize: '60px' }}></i>
                    <div class="" style={{ flexGrow: 1, marginLeft: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>   
                            <div class="file_name">A.docx</div>
                            <div class="Not_Error">Completed</div>
                        </div> 
                        <ProgressBar now={100}/>
                    </div>
                    <div>
                    <img src={Not_Error} alt=""></img>
                    </div>
                </div>
                {/* Đây là File 2*/}
                <div class="" style={{ display: 'flex', alignItems: 'center', gap:'10px'}}>
                    <i class="bi bi-filetype-pdf" style={{ fontSize: '60px' }}></i>
                    <div class="" style={{ flexGrow: 1, marginLeft: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>   
                            <div class="file_name">A.docx</div>
                            <div class="Not_Error">Uploading</div>
                        </div> 
                        <ProgressBar now={60}/>
                    </div>
                    <div>
                    <img src={Not_Error} alt=""></img>
                    </div>
                </div>

                <div class="" style={{ display: 'flex', alignItems: 'center', gap:'10px'}}>
                    <i class="bi bi-filetype-pdf" style={{ fontSize: '60px' }}></i>
                    <div class="" style={{ flexGrow: 1, marginLeft: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>   
                            <div class="file_name">A.docx</div>
                            <div class="Error">Error</div>
                        </div> 
                        <ProgressBar now={0}/>
                    </div>
                    <div>
                    <img src={Error} alt=""></img>
                    </div>
                </div>


                <div style={{display:"flex", justifyContent:"center" }}>
                <button type="submit" class="btn btn-success">Thiết lập trang in</button>
                </div>
            </div>
            </div>
        </section>
    );
}

export default Print;