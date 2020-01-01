import React, { useState, useMemo } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Select from 'react-select';
import { useQuery } from '@apollo/react-hooks';

import logo from '../../assets/logo.png';
import {
  ModalSubtitle,
  ModalTitle,
  GlobalStyle,
  ModalHeaderContainer,
  ModalBodyContainer,
  FullWrapper,
  ContentArea,
  LeftSideNavigation,
  RightSide,
  LeftSideTitle,
  ShowProfessorButton,
  Hidder,
  RetriveButton,
  ScrollArea,
  SearchSection,
  NavigationArrows,
  ArrowLeft,
  ArrowRight,
  NumberContainer,
  MenuSection,
  Indicator,
  LinkuButton,
} from './Home.styles';

import Modal from '../../components/Modal/Modal';
import Table from '../../components/Table/Table';

import makeData from '../../library/utils/makeData';
import { GET_SUBJECTS_QUERY } from '../../graphql/queries';

const SearchSelect = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_SUBJECTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { docs } = data.getSubjects;

  const options = docs.map((subject) => ({
    label: `${subject.name} (${subject.code}${subject.number})`,
    value: subject.id,
  }))

  let delayTimer;
  const search = (val) => {
    delayTimer = setTimeout(() => {
      fetchMore({
        variables: {
          search: val,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          return fetchMoreResult;
        }
      })
    }, 700);
  }

  return (
    <Select
      className="link2-select"
      placeholder="Escribe la materia a buscar"
      options={options}
      onInputChange={(val) => {
        clearTimeout(delayTimer);
        if (val && val.length > 3) {
          search(val);
        }
      }}
      isClearable
      isSearchable
    />
  );
};

function Home() {
  const data = React.useMemo(() => makeData(14), []);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    [],
  );
  const [modal, setModal] = useState({
    open: false,
  });

  const [leftSide, setLeftSide] = useState({
    active: true,
  });

  const toggleModalHandler = () => {
    setModal({
      open: !modal.open,
    });
  };

  const toggleLeftSide = () => {
    setLeftSide({
      active: !leftSide.active,
    });
  };

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <>
      <GlobalStyle />
      <Modal onClose={toggleModalHandler} show={modal.open}>
        <ModalHeaderContainer>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <section>
                <ModalTitle>Estas son las materias que ingresaste</ModalTitle>
                <ModalSubtitle>¿Faltó alguna?</ModalSubtitle>
              </section>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Select
                className="link2-select"
                placeholder="Escribe la materia que estas buscando"
                options={options}
              />
            </Col>
          </Row>
        </ModalHeaderContainer>
        <ModalBodyContainer></ModalBodyContainer>
      </Modal>

      <FullWrapper>
        <LeftSideNavigation active={leftSide.active}>
          <RetriveButton active={leftSide.active} onClick={toggleLeftSide}>
            <i className="fas fa-angle-right"></i>
          </RetriveButton>
          <Row>
            <span className="with-separator"></span>
          </Row>
          <Hidder active={leftSide.active}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <img className="logo-app" src={logo} alt="Logo" />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <LeftSideTitle>Arma tu horario</LeftSideTitle>
                <ShowProfessorButton onClick={toggleModalHandler}>
                  Ver Profesores{' '}
                </ShowProfessorButton>
              </Col>
            </Row>
          </Hidder>

          <ScrollArea active={leftSide.active}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <p className="unselection">Todavia no has agregado materias</p>
              </Col>
            </Row>
          </ScrollArea>
        </LeftSideNavigation>
        <ContentArea active={leftSide.active}>
          <SearchSection>
            <Row>
              <Col xs={12} sm={12} md={4} lg={4}>
                <h1 className="search_title">Buscar</h1>
                <SearchSelect />
                {/* <Select styles={{}} placeholder="Escribe la materia a buscar" options={options} /> */}
              </Col>
            </Row>
          </SearchSection>

          <MenuSection>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <Row middle="xs" start="xs">
                  <Col xs={2} sm={2} sm={2} lg={2}>
                    <NavigationArrows>
                      <ArrowLeft>
                        <i className="fas fa-angle-right"></i>
                      </ArrowLeft>
                      <NumberContainer value="1" />
                      <ArrowRight>
                        <i className="fas fa-angle-right"></i>
                      </ArrowRight>
                    </NavigationArrows>
                  </Col>
                  <Col xs={2} sm={2} sm={2} lg={2}>
                    <Indicator>
                      <p> 1 de 40 </p>
                    </Indicator>
                  </Col>
                  <Col xs={8} sm={8} sm={8} lg={8}>
                    <Row end="xs">
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <LinkuButton color="#DA8686">Limpiar filtro</LinkuButton>
                        <LinkuButton color="#114188">
                          <i className="fas fa-save"></i>
                          Guardar como pdf
                        </LinkuButton>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                {/* <Table columns={columns} data={data} /> */}
              </Col>
            </Row>
          </MenuSection>
        </ContentArea>
      </FullWrapper>
    </>
  );
}

export default Home;
