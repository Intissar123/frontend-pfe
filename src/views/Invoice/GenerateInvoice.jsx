import React from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  Document,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";

import logo from "../images/doc-thumb-1.jpg";

const GenerateInvoice = ({ orders }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.dropSellText}>Vip cleaning Facture</Text>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.col9}>
              <Text style={styles.invoiceId}>Facture Num°: {orders.id}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}></View>
          </View>
          <View style={styles.row}>
            <View style={styles.col8}>
              <Text style={styles.addressHeading}>
                A:{" "}
                {orders.user
                  ? `${orders.user.firstName} ${orders.user.lastName}`
                  : "intissar boukadida"}
              </Text>
              <Text style={styles.address}>Ville: {orders.location}</Text>
              <Text style={styles.address}>Adresse: {orders.address}</Text>
              <Text style={styles.address}>
                Téléphone : {orders.phoneNumber}
              </Text>
            </View>
            <View style={styles.col4}>
              <Text style={styles.invoiceDetails}>
                <Text style={styles.circle}></Text>Date:{" "}
                {orders.createdAt ? orders.createdAt.substring(0, 10) : "N/A"}
              </Text>

              <Text style={styles.invoiceDetails}>
                <Text style={styles.circle}></Text>Status:{" "}
                <Text style={styles.badge}>Paiement à la livraison</Text>
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <View style={styles.table}>
                <View style={styles.tableRowHeader}>
                  <Text style={styles.tableHeader}>#</Text>
                  <Text style={styles.tableHeader}>Produits</Text>
                  <Text style={styles.tableHeader}>Quantité</Text>
                  <Text style={styles.tableHeader}>Prix</Text>
                  <Text style={styles.tableHeader}>Totale</Text>
                </View>
                {orders.cartItems &&
                  orders.cartItems.map((item, index) => (
                    <View style={styles.tableRow} key={index}>
                      <Text style={styles.tableCell}>{index + 1}</Text>
                      <Text style={styles.tableCell}>{item.nomP}</Text>
                      <Text style={styles.tableCell}>{item.qte}</Text>
                      <Text style={styles.tableCell}>{item.prix} DT</Text>
                      <Text style={styles.tableCell}>
                        {parseFloat(item.prix) * item.qte} DT
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col3}>
              <Text style={styles.shipping}>
                Livraison: {orders.delivery} DT
              </Text>

              <Text style={styles.total}>
                Prix totale: {orders.totalAmount} DT
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col9}>
              <Text style={styles.thankYou}>Merci pour votre achat.</Text>
            </View>
            <View style={styles.col3}>
              <Text style={styles.payNow}>Signature du client</Text> <br></br>
              <br></br>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 40,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  container: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  col: {
    flex: 1,
  },
  col9: {
    flex: 0.9,
  },
  col8: {
    flex: 0.8,
  },
  col4: {
    flex: 0.4,
  },
  col3: {
    flex: 0.3,
  },
  button: {
    backgroundColor: "#e9ecef",
    borderRadius: 4,
    padding: 5,
    marginRight: 5,
    textAlign: "center",
  },
  invoiceId: {
    color: "#7e8d9f",
    fontSize: 20,
  },
  addressHeading: {
    color: "#5d9fc5",
    fontSize: 12,
    marginBottom: 5,
  },
  address: {
    color: "#000",
    fontSize: 12,
    marginBottom: 2,
  },
  invoiceDetailsHeading: {
    color: "#000",
    fontSize: 12,
    marginBottom: 5,
  },
  invoiceDetails: {
    color: "#000",
    fontSize: 12,
    marginBottom: 2,
  },
  circle: {
    width: 8,
    height: 8,
    backgroundColor: "#84B0CA",
    borderRadius: "50%",
    marginRight: 5,
  },
  badge: {
    backgroundColor: "#f0ad4e",
    color: "#000",
    fontWeight: "bold",
    padding: "3px 6px",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
  },
  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#84B0CA",
    color: "#fff",
    fontWeight: "bold",
    padding: 5,
  },
  tableHeader: {
    flex: 1,
    padding: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
    padding: 5,
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  notes: {
    marginLeft: 10,
    fontSize: 12,
  },
  total: {
    fontSize: 12,
  },
  thankYou: {
    fontSize: 12,
    marginLeft: 10,
  },
  payNow: {
    color: "#000",
    fontSize: 12,
    marginBottom: 2,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dropSellText: {
    fontSize: 20,
    marginLeft: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    alignSelf: "flex-end",
  },
  shipping: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const MyComponent = () => {
  const orders = {
    id: 1,
    totalAmount: 0,
    location: "",
    city: "",
    phoneNumber: "",
    delivery: 0,
    address: "",
    status: "",
    createdAt: "",
    cartItems: [
      {
        id: 123,
        designation: "Product A",
        size: "M",
        price: "10",
        image: "productA.jpg",
        quantity: 2,
      },
      // Add more cart items as needed...
    ],
    user: {
      firstName: "",
      lastName: "",
    },
  };

  return (
    <div>
      <PDFDownloadLink
        document={<GenerateInvoice orders={orders} />}
        fileName="invoice.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default GenerateInvoice;
