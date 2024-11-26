import '../components/css/Hero.css';
import '../components/css/Print_Config.css';
import Form from 'react-bootstrap/Form';
import FilePreview from '../components/File_Preview';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import pdfFile from '../assets/images/N5-2018.pdf';
import ai from '../assets/images/ai.docx';
import img3 from '../assets/images/img2.png'
import ex from '../assets/images/patients.csv'

function Print_Config() {
    // Mấy ông Backend làm Logic gì ở đây nha 
    const docs = [
        { uri: pdfFile, // Remote file
          fileType: "pdf",
          fileName: "N5-2018.docx"
        },
        {
            // uri: require('../assets/images/N5-2018.pdf'),
            uri: require('../assets/images/patients.csv')
        }
      ];
    

    
    const img = [
        { uri: img3,
            fileType: 'png',
          fileName: "img2.png"
        }
    ];
    const [isCustomSelected, setIsCustomSelected] = useState(false);
    const handleSelectChange = (e) => { 
        if (e.target.value === "0") { 
            setIsCustomSelected(true); 
        } else { 
            setIsCustomSelected(false); 
        } 
    };
    


    return (
        <section id="hero" className="block hero-block" style={{ margin: '10px 0px 0' }}>
            <div style={{width:'100vw', height:'100vh'}}>
                <div className="container-fluid config-container" style={{minHeight: '500px'}}>
                    <div className="row" style={{height: '100%'}}>
                        <div className="col-8 border-col" style={{height:'100%'}}>
                            <div className="file-preview-container">
                            <FilePreview style={{height:'100%', width:'100%'}} docs={docs} />

                            </div>
                        </div>
                        <div className="col" style={{height:'100%'}}>
                            <div className="config-header normal-font" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                THÔNG SỐ IN
                            </div>
                            <div className="config-body" style={{height:'88%'}} >
                                <div style={{display:'flex',justifyContent:'center'}}>
                                <div className="normal-font" style={{ marginRight: '20px'}} >
                                    <div className ="spacing">Máy in</div>
                                    <div className ="spacing">Số trang</div>
                                    <div className ="spacing">Số trang</div>
                                    <div className ="spacing">Mặt in</div>
                                    <div className ="spacing">Tỉ lệ</div>
                                    <div className ="spacing">Số bản</div>
                                    <div className ="spacing">Khổ giấy</div>
                                    </div>
                                <Form className='normal-font' style={{ maxWidth:"40%"}} >

                                    <Form.Select aria-label="Printer" style={{marginTop:"15%", marginBottom:"16%"}}> 
                                    <option value="1">Máy in 1</option>
                                    <option value="2">Máy in 2</option>
                                    <option value="3">Máy in 3</option>
                                    <option value="4">Máy in 4</option>
                                    </Form.Select>

                                    <Form.Select aria-label="Default select example" className="form-style" onChange={handleSelectChange}> 
                                    <option value="1">Toàn bộ</option>
                                    <option value="2">In trang chẵn</option>
                                    <option value="3">In trang lẻ</option>
                                    <option value="0">Tùy chỉnh</option>
                                    </Form.Select>

                                    <Form.Control size="sm" type="text" placeholder="Số Trang" disabled={!isCustomSelected} className="form-style" style={{height:"5%"}}/>

                                    <Form.Select aria-label="Default select example" className="form-style"> 
                                    <option value="1">Một mặt</option>
                                    <option value="2">Hai mặt</option>
                                    </Form.Select>

                                    <Form.Select aria-label="Default select example" className="form-style"> 
                                    <option value="1">Mặc định</option>
                                    <option value="2">Tùy chỉnh</option>
                                    </Form.Select>

                                    <Form.Control size="sm" type="text" placeholder="Số Bản" className="form-style" style={{height:"5%"}}/>

                                    <Form.Select aria-label="Default select example" className="form-style"> 
                                    <option value="1">A4</option>
                                    <option value="2">A3</option>
                                    </Form.Select>
                                </Form>
                                </div>
                                <div style={{display:'flex',justifyContent:'center', marginBottom:"30px"}}><button type="button" class="btn btn-primary">Lưu</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Print_Config;