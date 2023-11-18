import { initFirestore } from "@auth/firebase-adapter"
import admin from "firebase-admin";

let app;

const adminConfig = {
    type: "service_account",
    project_id: "saas-translator-yt",
    private_key_id: "469ec2bfff2dfe358349e916de003d195c1338a4",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCvnNu2j9eYzbI8\nr8MKM6fPPOEKNgTVlfIwUllvnnuGyzgDXXAP5Pbr4qhlUuMGsrbLmZLdlLB1E/fJ\n1L/Wr0dPhiB163db4tmzSuR8qzYLA6j/X2lbdytijcl2af9Niqdlz8GZLo7X8uUA\nsi604yY6Cn34uOD4MxiQMpxtU9FPJXt6p2Eeh7k6dlEWxXDzPXgsI0ksrc0gZtsr\nuzBNitjKN/D5FCwsLmQATlxjGmi+PoEsm18RGW1872KPqrHMTqUwJi/sbMHqrAL6\n3TH3vCBrVHGxh7QMeGwbo7QMtstYYzpaaOhnHx1VWVInBBLuxC6mdc+MCjsGFYCJ\nlNS/PM8tAgMBAAECggEAP8DCQtSVgHOscTudouZ91U5UpFBYEPIOqlw6+7qdPaIp\nA4+4TwzgV2JBoAcnRBc9JUzrdGW2acqF+k+yFU4spUIcJrME8ea5Ac3+hQPi6ry5\nbXxF016/8Vdn/AUfGhdsDhoOPn4YfW1AlbAaJLER/6Ave0wi3/gswqyc/VOgeQqY\nhhFQnqwsknfHz6tWvbfP8K3GIQNcudQj1FDQvPf/b3dvETl6rmfppaaRHqrcA9Qs\nplCd74K23McAxosblUCFnpSRuSXDUcqdZ/+6rHGAbP4XrkmdfoH+aSdvUzCkpH9l\nCEpkU3A3PDtyY+KaPbexvD3MN2+sp3ZGUDdo0aB0QQKBgQDUVaNBVbRev0Jqes7N\nwpBjyVUmNhusqdo05yJ97mbIwnxBqM6ppxEenLeiX0yJX4sNxsHNCRas+uvKC3Q1\nmDuXnjx67/xNMCxavu/s8HqV3SbfBbWJiQFP6LIqhiKHMHRBzstLUMplQoH0H238\nqKon2t33mUG0XQlapdZQ7Uy9ywKBgQDTuf/rntp2jsgw5tGN6suTsSl6xvPv8c5E\nZA0xnurx0nZSFSEOZnEypmJRSTo3s5K8R8BjuB9DAneoNZSiEw/WURJVSli8b/nm\nAs0MFcItbwiCLtHd/Ne5bp6jPDT6arAHyOkOOAZxsuuGUmvtpBRZ59UKgbggflIR\ngUs+V8cH5wKBgFkVtPDsbEh0JgFWlP1u6/Vxuu/VM7c1a/9WGfqL00PXlRpXIJ29\nIkmdps3Q/eOE2mplQVosvf7FJ7gVJiR2QkpScT2DAm/ADlvkT/Uwz72gk3ZuhsO1\nX3+POXDt5f6iLaSOhmyK8N+bD7rElPi0Ku+dvBLtkcuCXTJS8Z/yb4gRAoGARYvI\nI4YnbmASI/X9iWdBfX7pCBpH0F4WCeLvbogr1kjycp3cINXHgwKiMt8hz2Ad59iN\nunOlWSZ7VXZcHyyxvA0fP4LPSP5jEImE/t46zR+2pMRqTUebOJ68XxQMtuDKd5Qn\n8XK3sys5MALszr9hq/J5yRy49Xtoy7UzmQPOLasCgYAQM0MxJME1DPH+bRcwyT4t\nu3qRtg9xPUmF6miBkwYlBkmYyrntObx0vFp8Knj62csFyvqL/nFu8LupnTTT24z5\n7ENYnTgMtrnNf+DstLc6DBNVPCPW5vNDFeDkVxLW5cQxJSscflg2r8sEc1L+hMP4\n41EFQ0l8DLlIlxbk73k/+A==\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-v62qg@saas-translator-yt.iam.gserviceaccount.com",
    client_id: "100000662932820247466",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-v62qg%40saas-translator-yt.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
};

if (!admin.apps.length) {
    app = admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_CONFIG_PROJECT_ID,
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
        })
    })
}

const adminDb = initFirestore({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_CONFIG_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
    })
})

const adminAuth = admin.auth(app);

export { adminDb, adminAuth };

