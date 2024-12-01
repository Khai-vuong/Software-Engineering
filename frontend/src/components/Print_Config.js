import '../components/css/Hero.css';
import '../components/css/Print_Config.css';
import Form from 'react-bootstrap/Form';
import FilePreview from '../components/File_Preview';
import React, { useState,useEffect, useRef } from 'react';
import pdfFile from '../assets/images/N5-2018.pdf';
import Modal from 'react-bootstrap/Modal';
// import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';



const inputData = {
    numberOfPage: 0,
    numberOfCopy: 0,
    ratio: '',
    paperSize: '',
    numberOfSide: '',
    pname: ''
};


function Save(props) {
    const location = useLocation();
    const { file } = location.state || {}; // Access the file from the state

    const [filename, setFilename] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const [availablePages, setAvailablePages] = useState(25); 

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const fileNameFromParams = params.get('filename');
        if (fileNameFromParams) {
            setFilename(fileNameFromParams);
        }

        if (totalPage === 0) {
            const randomTotalPage = Math.floor(Math.random() * 11) + 10;
            setTotalPage(randomTotalPage);
        }
        //Ko gọi được API là vì sao?
        //! thêm credential

        axios.get('http://localhost:4000/printing/balance', {
            withCredentials: true
        })
            .then(response => {
                alert('User balance: ' + response.data.balance);
                setAvailablePages(response.data.balance);
            })
            .catch(error => {
                console.error('There was an error fetching the user balance!', error);
            });

    }, [location.search, totalPage]);

    // Now you can use the file as needed
    console.log('file: ' + JSON.stringify(location));
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Xác nhận in
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>
          <h3>File: {filename}</h3>
          {file && <h3>Uploaded File: {file.name}</h3>}
          <h3>Số trang: {totalPage}</h3>
          <h3>Số bản: {inputData.numberOfCopy}</h3>
          <h3>Số trang hiện có: {availablePages} </h3>
        </Modal.Body>
        <Modal.Footer>
            <Link to={`/confirm/${filename}`}>
                <Button variant="primary" type="submit">
                        Xác nhận
                </Button>
            </Link>
          <Button onClick={props.onHide}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
}
function Print_Config() {
    const formRef = useRef();
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
   
      const [printers, setPrinters] = useState([]);
      const [isCustomSelected, setIsCustomSelected] = useState(false);
      const [filePreview, ] = useState(docs); 

      const [selectedPrinter, ] = useState('Printer A');
      const [numberOfPage, ] = useState(0);
      const [numberOfCopy, setNumberOfCopy] = useState(1);
    const [ratio, ] = useState('');
    const [paperSize, ] = useState('');
    const [numberOfSide, ] = useState('');
      
    const updateNumCopies = (e) => {   
        alert('Number of copies: ' + e.target.value);
        setNumberOfCopy(e.target.value);
        inputData.numberOfCopy = e.target.value;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedInputData = {
            numberOfPage: numberOfPage,
            numberOfCopy: numberOfCopy,
            ratio: ratio,
            paperSize: paperSize,
            numberOfSide: numberOfSide,
            pname: selectedPrinter
        };
        console.log(updatedInputData);
        // New code to save print history to the backend
        axios.post('http://localhost:4000/printing/saveHistory', {
            PName: selectedPrinter,
            DName: "N5-2018.docx",
            config: {
                StartTime: new Date().toISOString(),
                EndTime: new Date(new Date().getTime() + 30 * 60000).toISOString(),
                Status: 'Completed',
            }
        },{
            withCredentials: true  // Add this configuration
        })
        .then(response => {
            console.log('Print history saved successfully:', response.data);
        })
        .catch(error => {
            console.error('There was an error saving the print history!', error);
        });
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';  // Disable scroll

        //Init the printers
        axios.get('http://localhost:4000/printing/printerList')
        .then(response => {
        setPrinters(response.data.printers);
        })
        .catch(error => {
        console.error('There was an error fetching the printer list!', error);
        });

        //IDK what this is for, so Imma leave it as it is! __Khair Backend
        // Cleanup: restore scroll behavior when the component unmounts or changes
        return () => {
            document.body.style.overflow = 'auto';  // Enable scroll again
        };
    }, []);


    const handleSelectChange = (e) => { 
        if (e.target.value === "0") { 
            setIsCustomSelected(true); 
        } else { 
            setIsCustomSelected(false); 
        } 
    };
    const [modalShow, setModalShow] = React.useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        handleSubmit(e);
        setModalShow(true);
    };

    return (
        <section id="hero" className="block hero-block" style={{ margin: '10px 0px 0' }}>
            <div style={{width:'100vw', height:'100vh'}}>
                <div className="container-fluid config-container" style={{minHeight: '500px'}}>
                    <div className="row" style={{height: '100%'}}>
                        <div className="col-8 border-col" style={{height:'100%'}}>
                            <div className="file-preview-container">
                            <FilePreview style={{height:'100%', width:'100%'}} docs={filePreview} />

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
                                <Form ref={formRef} className='normal-font' style={{ maxWidth:"40%"}} onSubmit={handleSubmit}>

                                    <Form.Select aria-label="Printer" style={{marginTop:"15%", marginBottom:"16%"}}> 

                                    {printers.map((printer, index) => (
                                        <option key={index} value={index}>{printer}</option>
                                    ))}
                                    
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

                                    <Form.Control size="sm" type="text" placeholder="Số Bản" className="form-style" style={{height:"5%"}}
                                    onChange={updateNumCopies}/>

                                    <Form.Select aria-label="Default select example" className="form-style"> 
                                    <option value="1">A4</option>
                                    <option value="2">A3</option>
                                    </Form.Select>
                                </Form>
                                </div>
                                <div style={{display:'flex',justifyContent:'center', marginBottom:"30px"}}>
                                    <div className="button-holder">
                                        <Button 
                                            variant="primary" 
                                            onClick={handleSave}
                                        >
                                            Lưu
                                        </Button>
                                        <Save
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Print_Config;