import {
  Container,
  Column,
  Html,
  Head,
  Body,
  Preview,
  Img,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const EmailTemplate = ({ senderName }:{senderName:string}) => {
  return (
    <Html>
      <Head />
      <Preview>Sent via Demistify</Preview>
      <Body style={main}>
        <Container>
          <Section style={content} className="relative ">
            <img
              src={
                process.env.TEMPLATELOGO
              }
              style={{ width: "100%" }}
              className="w-full object-cover h-10"
            />

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  One new File for you!
                </Heading>

                <Text
                  style={{ ...paragraph, marginTop: 2 }}
                  className="text-left"
                >
                  Hello There,
                </Text>
                <Text
                  style={{ ...paragraph, marginTop: 2 }}
                  className="text-left"
                >
                  {senderName} has sent you an Image via Demistify. Please find
                  the file attached with this mail.
                </Text>
              </Column>
            </Row>
            {/* <Row style={{ ...boxInfos }}>
                <Column style={{...containerButton,textAlign: 'center' }} colSpan={2}>
                  <a href={fileUrl} target="_blank"style={{...button,display: 'inline-block', textAlign: 'center', margin: '0 auto' }}>View File</a>
                </Column>
                </Row> */}

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <p style={{ ...paragraph }} className="mb-0 mt-10">
                  Regards
                </p>
                <p style={{ ...paragraph }} className="mt-2 font-semibold">
                  Team Demistify
                </p>
              </Column>
            </Row>
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2024 | Demistify, Room No. 317, GBPIET, Ghurdauri, Pauri,
            Uttarakhand, 246194
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#007dfc",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};
