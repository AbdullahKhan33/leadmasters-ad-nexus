import React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface AgentWelcomeEmailProps {
  agentName: string;
  agentCode: string;
  resetLink: string;
}

export const AgentWelcomeEmail = ({
  agentName,
  agentCode,
  resetLink,
}: AgentWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to LeadMasters - Your Agent Account is Ready</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to LeadMasters!</Heading>
        <Text style={text}>
          Hi {agentName},
        </Text>
        <Text style={text}>
          Your agent account has been created successfully! To get started with the LeadMasters platform, 
          you need to set your password first.
        </Text>
        
        <div style={detailsBox}>
          <Text style={detailsHeader}>Your Account Details:</Text>
          <Text style={detail}><strong>Agent Code:</strong> {agentCode}</Text>
          <Text style={detail}><strong>Email:</strong> {agentName.split('@')[0] ? 'Use the email address this was sent to' : 'Use your registered email'}</Text>
        </div>

        <Text style={text}>
          Click the button below to set your password and access your dashboard:
        </Text>

        <Link
          href={resetLink}
          style={button}
        >
          Set Your Password & Get Started
        </Link>

        <Text style={note}>
          <strong>Important:</strong> This link will expire in 24 hours for security reasons. 
          If it expires, please contact your administrator for a new invitation.
        </Text>

        <Text style={footer}>
          Welcome to the team!<br/>
          The LeadMasters Team
        </Text>
      </Container>
    </Body>
  </Html>
)

export default AgentWelcomeEmail

const main = {
  backgroundColor: '#f6f9fc',
  padding: '20px 0',
}

const container = {
  backgroundColor: '#ffffff',
  padding: '20px',
  margin: '0 auto',
  maxWidth: '600px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}

const h1 = {
  color: '#7c3aed',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
}

const text = {
  color: '#374151',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
}

const detailsBox = {
  backgroundColor: '#f3f4f6',
  border: '1px solid #e5e7eb',
  borderRadius: '6px',
  padding: '20px',
  margin: '24px 0',
}

const detailsHeader = {
  color: '#1f2937',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
}

const detail = {
  color: '#374151',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
  fontSize: '14px',
  margin: '8px 0',
}

const button = {
  backgroundColor: '#7c3aed',
  borderRadius: '6px',
  color: '#ffffff',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 24px',
  margin: '24px 0',
}

const note = {
  color: '#6b7280',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
  fontSize: '14px',
  lineHeight: '20px',
  margin: '20px 0',
  padding: '12px',
  backgroundColor: '#fef3c7',
  borderRadius: '6px',
  border: '1px solid #f59e0b',
}

const footer = {
  color: '#6b7280',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
  fontSize: '14px',
  lineHeight: '20px',
  marginTop: '32px',
  textAlign: 'center' as const,
}