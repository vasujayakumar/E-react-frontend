import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Card } from 'antd';
import { fetchSpecialities } from '../redux/actions/specialitiesActions';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

const { Meta } = Card;
const Specialities = () => {

    const dispatch = useDispatch();
    const specialities = useSelector((state) => state.specialities.specialities);

    // sort specialities based on the first letter
    const sortedSpecialities = [...specialities].sort((a, b) => {
        const first = a.speciality[0].toUpperCase();
        const second = b.speciality[0].toUpperCase();
        return first.localeCompare(second);
    });

    useEffect(() => {
        dispatch(fetchSpecialities());
    }, [dispatch]);

    const groupedSpecialities = sortedSpecialities.reduce((acc, curr) => {
        const initial = curr.speciality[0].toUpperCase();
        if (!acc[initial]) {
            acc[initial] = [];
        }
        acc[initial].push(curr);
        return acc;
    }, {});

    return (
        <div style={{ padding: '20px' }}>
            {Object.entries(groupedSpecialities).map(([initial, group], groupIndex) => (
                <Row gutter={[16, 16]} key={groupIndex} style={groupIndex > 0 ? { marginTop: '20px' } : {}}>

                    <Col span={24} style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '24px' }}>
                        {initial}
                    </Col>

                    {group.map(speciality => (
                        <Col xs={24} sm={12} md={8} lg={8} xl={6} key={speciality.id}>
                            <Card hoverable={true}>
                                <Link to={speciality.target_link} style={{ textDecoration: 'none' }}>
                                    <Meta
                                        avatar={
                                            <Avatar src={"/images/specialities/" + (speciality.avatar_url ? (speciality.avatar_url + '.png'): "logo192.png")}
                                                size={64} />}
                                        title={<span style={{ whiteSpace: 'normal', overflow: 'visible' }}>{speciality.speciality}</span>}
                                        description={speciality.description ? speciality.description : "This is the description"}
                                    />
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ))}
        </div>
    );
};

export default Specialities;