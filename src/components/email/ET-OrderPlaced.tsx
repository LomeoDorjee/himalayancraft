import * as React from 'react';
import { Html, Head, Body, Container, Text, Img, Section, Button } from '@react-email/components';

type EmailProps = {
    firstName: string
}

export default function ET_OrderPlaced({ firstName }: EmailProps) {
    return (
        <Html lang="en">
            <Head />
            <Body style={main}>
                <Container style={container}>
                    <div style={header}>
                        <Img src="https://your-logo-url.com/logo.png" alt="Company Logo" style={logo} />
                    </div>
                    <Text style={heading}>Order Placed!</Text>
                    <Text style={heading}>
                        Dear {firstName},
                    </Text>
                    <Text style={paragraph}>
                        Your order has been successfully placed! Please await further instructions, which will be sent to you via email shortly.
                    </Text>
                    <div style={buttonContainer}>
                        <Button style={button} href="https://your-website.com/orders">
                            View Order Details
                        </Button>
                    </div>
                    <footer style={footer}>
                        <Text style={footerText}>© 2024 Your Company. All rights reserved.</Text>
                        <Text style={footerText}>1234 Street Name, City, State, 12345</Text>
                        <Text style={footerText}>Follow us on
                            <a href="https://facebook.com" style={link}> Facebook</a>,
                            <a href="https://twitter.com" style={link}> Twitter</a>, and
                            <a href="https://instagram.com" style={link}> Instagram</a>.
                        </Text>
                    </footer>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: '#f6f9fc',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: 'url("https://your-background-pattern-url.com/pattern.png")',
    backgroundSize: 'cover',
};

const container = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center' as 'center',
};

const header = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
};

const logo = {
    width: '150px',
    marginBottom: '20px',
};

const heading = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333333',
    textAlign: 'center' as 'center',
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#555555',
    textAlign: 'center' as 'center',
};

const buttonContainer = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
};

const button = {
    display: 'inline-block',
    padding: '10px 20px',
    marginTop: '20px',
    backgroundColor: '#1a73e8',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
};

const footer = {
    marginTop: '40px',
    borderTop: '1px solid #eaeaea',
    paddingTop: '20px',
    textAlign: 'center' as 'center',
};

const footerText = {
    fontSize: '14px',
    color: '#888888',
};

const link = {
    color: '#1a73e8',
    textDecoration: 'none',
    marginLeft: '5px',
};