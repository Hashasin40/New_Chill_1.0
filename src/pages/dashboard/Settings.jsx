import { useState } from 'react';
import { Container, Row, Col, ListGroup, Dropdown } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

function Settings() {
  const [activeSection, setActiveSection] = useState('profile');

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isSmallMobile = useMediaQuery({ maxWidth: 500 });
  const isTinyMobile = useMediaQuery({ maxWidth: 300 });

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <div className="p-3 bg-light rounded">Form edit profil pengguna</div>;
      case 'security':
        return <div className="p-3 bg-light rounded">Pengaturan password dan autentikasi</div>;
      case 'notifications':
        return <div className="p-3 bg-light rounded">Preferensi notifikasi email dan push</div>;
      default:
        return <div className="p-3 bg-light rounded">Pilih menu di bawah</div>;
    }
  };

  const menuItems = [
    { key: 'profile', label: 'Profil' },
    { key: 'security', label: 'Keamanan' },
    { key: 'notifications', label: 'Notifikasi' },
  ];

  return (
    <Container fluid className="py-4">
      {isTinyMobile ? (
        <>
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {menuItems.find(item => item.key === activeSection)?.label || 'Pilih'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {menuItems.map(item => (
                <Dropdown.Item key={item.key} onClick={() => setActiveSection(item.key)}>
                  {item.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {renderContent()}
        </>
      ) : isSmallMobile ? (
        <>
          <ListGroup className="mb-3">
            {menuItems.map(item => (
              <ListGroup.Item
                key={item.key}
                action
                active={activeSection === item.key}
                onClick={() => setActiveSection(item.key)}
              >
                {item.label}
              </ListGroup.Item>
            ))}
          </ListGroup>
          {renderContent()}
        </>
      ) : (
        <Row>
          <Col md={3}>
            <ListGroup>
              {menuItems.map(item => (
                <ListGroup.Item
                  key={item.key}
                  action
                  active={activeSection === item.key}
                  onClick={() => setActiveSection(item.key)}
                >
                  {item.label}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={9}>
            {renderContent()}
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Settings;
