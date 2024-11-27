import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import '../components/css/Hero.css';

function AppHistory() {
    return (
      <section id="hero" className="block hero-block">
        <Container fluid>
            <div className="title-holder">
                <h2>Lịch sử in</h2>
            </div>
            
            <Table className="table" responsive="xl">
                <thead>
                <tr>
                    <th>No</th>
                    <th>Tên tài liệu</th>
                    <th>Máy in</th>
                    <th>Thời gian bắt đầu</th>
                    <th>Thời gian kết thúc</th>
                    <th>Trạng thái</th>
                    <th>Xem chi tiết</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
                </tbody>
            </Table>
        </Container>
      </section>
    );
  }
  
  export default AppHistory;