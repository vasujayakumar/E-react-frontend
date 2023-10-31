import React, { useEffect } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

const { Meta } = Card;

const Services = () => {
  var isDoctor = false;
  if(sessionStorage.getItem('loginData')!==null){
    isDoctor = JSON.parse(sessionStorage.getItem('loginData')).type === 'Doctor';
  }

  return (
    <div style={{ padding: '20px' }}>
      { !isDoctor ?
        <Row gutter={[16, 16]} key={0} style={{}}>
          <Col span={24} style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '24px' }}>
            B
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} xl={6} key={'BookTime'}>
            <Card hoverable={true}>
              <Link to="/calendar/booktime" style={{ textDecoration: 'none' }}>
                  <Meta
                      title={<span style={{ whiteSpace: 'normal', overflow: 'visible' }}>BookTime</span>}
                      description="For patients to book doctors' time"
                  />
              </Link>
            </Card>
          </Col>
        </Row> :
        null
      }

      <Row gutter={[16, 16]} key={0} style={{}}>
        <Col span={24} style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '24px' }}>
          C
        </Col>

        <Col xs={24} sm={12} md={8} lg={8} xl={6} key={'Calendar'}>
          <Card hoverable={true}>
            <Link to="/calendar" style={{ textDecoration: 'none' }}>
                <Meta
                    title={<span style={{ whiteSpace: 'normal', overflow: 'visible' }}>Calendar</span>}
                    description="Doctors and Patients Calendar"
                />
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Services;
