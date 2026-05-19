import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col } from 'react-bootstrap'

import Banner from './components/Banner'
import Profile from './components/Profile'
import Orchids from './components/Orchids'

// import students from './data/listStudent'

function App() {

  return (
    <Container className="mt-4">

{/* 
      <h1 className="mb-4">
        Danh sách sinh viên
      </h1>

      <Row>

        {
          students.map((student) => (

            <Col md={4} key={student.id} className="mb-4">

              <Profile person={student} />

            </Col>

          ))
        }

      </Row> */}

    <Banner />

      <hr className="my-5" />

      <h1 className="mb-4">
        Danh sách Orchids
      </h1>

      <Orchids />

    </Container>
  )
}

export default App