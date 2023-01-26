import axios from "axios";
import { Spinner } from 'react-bootstrap';
import './App.css';
import { useContext, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import './index.css'
import NavBar from './components/Navbar'
import Context from './StateProvider'
import Menu from './components/Menu'
import Capabilities from './components/Capabilities';
import InputArea from './components/InputArea';



export default function App() {

  const setCapabilities = useContext(Context).capabilities[1];
  const [loadingTextBox, setLoadingTextBox] = useContext(Context).loadingTextBox;


  useEffect(() => {
    let fn = async () => {
      setLoadingTextBox(true)
      let tempObj = {}
      let { data: capabilitiesData } = await axios.get('/api/capabilities')
      for (let i in capabilitiesData) {
        let { data: capabilitiesTagsData } = await axios.get(`/api/capability/${capabilitiesData[i]}-capability/tags`)
        for (let j in capabilitiesTagsData) {
          tempObj[capabilitiesData[i]] ? tempObj[capabilitiesData[i]][capabilitiesTagsData[j]] = {} : tempObj[capabilitiesData[i]] = { [capabilitiesTagsData[j]]: {} }
          let { data: capabilitiesTagsDirectives } = await axios.get(`api/capability/${capabilitiesData[i]}-capability/tag/${capabilitiesTagsData[j]}/directives`)
          for (let k in capabilitiesTagsDirectives) {
            tempObj[capabilitiesData[i]] ? tempObj[capabilitiesData[i]][capabilitiesTagsData[j]][capabilitiesTagsDirectives[k]] = {} : tempObj[capabilitiesData[i]][capabilitiesTagsData[j]] = { [capabilitiesTagsDirectives[k]]: {} }
          }

        }
      }
      setCapabilities(tempObj)
      setLoadingTextBox(false)
    }

    fn()
  }, [setCapabilities, setLoadingTextBox]);

  return (
    <Container fluid>
      <NavBar />
      {loadingTextBox ? <Spinner animation="border" size="sm" variant="primary" /> :
        <Row>
          <Col>
            <Container>
              <Card className="manifest">
                <Menu />
                <Card.Body className="cardname">
                  <Capabilities />
                </Card.Body>
              </Card>
            </Container>
          </Col>
          <InputArea />
        </Row>
      }
    </Container>

  )
}




