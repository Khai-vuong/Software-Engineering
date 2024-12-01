import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import '../components/css/Hero.css';
import React, { useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import check from '../assets/images/check.png'
// import waiting from '../assets/images/waiting.png'
// import inprogress from '../assets/images/in-progress.png'
// import status from '../assets/images/status.png'

function AppPrintStatus() {
    const url = window.location.href;
    const filename = url.substring(url.lastIndexOf('/') + 1);

    useEffect(() => {
        alert(filename);
    },[filename]);

    return (
      <section id="hero" className="block hero-block">
        <Container fluid>
            <div className="title-holder">
                <h2>Trạng thái in</h2>
            </div>
            
            <Table className="table" responsive="xl">
                <thead>
                <tr>
                    <th>Tên file</th>
                    <th>Trạng thái</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{filename}</td>
                    <td style={{color: 'green'}}>
                        In Thành công {' '}
                        <Image src={check} className="img-fluid" style={{ maxWidth: '20px', height: '20' }} />
                    </td>
                </tr>
                {/* <tr>
                    <td>B.docx</td>
                    <td style={{color: 'blue'}}>    
                        Đang in{' '}
                        <Image src={inprogress} className="img-fluid" style={{ maxWidth: '20px', height: '20' }} />
                    </td>
                    
                </tr>
                <tr>
                    <td>D.docx</td>
                    <td style={{color: 'black'}}>
                        Chờ in{' '}
                        <Image src={waiting} className="img-fluid" style={{ maxWidth: '20px', height: '20' }} />
                    </td>

                </tr>
                <tr>
                    <td>E.docx</td>
                    <td style={{color: 'red'}}>
                        In thất bại{' '}
                        <Image src={status} className="img-fluid" style={{ maxWidth: '20px', height: '20' }} />
                    </td>
                </tr> */}
                </tbody>
            </Table>
        </Container>
      </section>
    );
  }
  
  export default AppPrintStatus;