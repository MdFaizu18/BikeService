import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/404.png';

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error);

    // Check if error exists and has a status property
    const isError = error && error.status;

    return (
        <Wrapper>
            <div>
                {isError && error.status === 404 ? (
                    <>
                        <img src={img} alt="not found" />
                        <h3>Oops! Page not found</h3>
                        <p>We can't seem to find the page you are looking for</p>
                        <Link to="/">Back Home</Link>
                    </>
                ) : (
                        <>
                            <img src={img} alt="not found" />
                            <h3>Oops! Page not found</h3>
                            <p>We can't seem to find the page you are looking for</p>
                            <Link to="/">Back Home</Link>
                        </>
                )}
            </div>
        </Wrapper>
    );
};

export default ErrorPage;
