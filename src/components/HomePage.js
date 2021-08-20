import React from 'react';
import { Link } from 'react-router-dom'
import { PROJECTS } from '../services/data'
import { Card, ListGroup, Media } from 'react-bootstrap';
import './HomePage.scss'


export default function HomePage() {
    return (
        <div className="wrap home">
            <Card>
                <div className="d-flex">
                    <Card.Header className="text-center text-white rotate">Front End Libraries Projects</Card.Header>
                    <ListGroup variant="flush">
                        {
                            PROJECTS.map(({ name, src, description }) => 
                                <ListGroup.Item className="prj" key={name}>
                                    <Link className="card-link text-dark" to={`/${name.toLowerCase()}`}>
                                        <Media>
                                            <figure className="align-self-center p-2 m-0 mr-3 rounded-circle">
                                                <img 
                                                    width={45}
                                                    height={45}
                                                    src={src} 
                                                    alt={name}
                                                />
                                            </figure>
                                            <Media.Body>
                                                <h5 className="mb-0">{name}</h5>
                                                <p className="text-secondary">{description}</p>
                                            </Media.Body>
                                        </Media>
                                    </Link>
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </div>   
            </Card>
        </div>
    );
}