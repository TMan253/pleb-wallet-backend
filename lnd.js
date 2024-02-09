const LndGrpc = require("lnd-grpc");
const dotenv = require("dotenv");

dotenv.config();

const options = {
    host: process.env.LND_NODE_HOST,
    cert: process.env.LND_NODE_TLS_CERT,
    macaroon: process.env.LND_NODE_MACAROON,
};

const lnd = new LndGrpc(options);

const connect = async () => {
    try {
        await lnd.connect();
        if (lnd.state !== "active") {
            throw new Error("LND did not reach 'active' state before timeout");
        }
        console.log("LND gRPC connection state active");

        // Start an invoice event stream.
        invoiceEventStream();
    } catch (e) {
        console.log("Error", e);
    }
};

const getBalance = async () => {
    const balance = await lnd.services.Lightning.walletBalance();
    return balance;
};

const getChannelBalance = async () => {
    const channelBalance = await lnd.services.Lightning.channelBalance();
    return channelBalance;
};

const createInvoice = async ({ value, memo }) => {
    const invoice = await lnd.services.Lightning.addInvoice({ value:value, memo:memo});
    return invoice;
};

const payInvoice = async ({ payment_request }) => {
    const paidInvoice = await lnd.services.Lightning.sendPaymentSync({
        payment_request:payment_request
    });
    return paidInvoice;
};

const invoiceEventStream = async () => {
    await lnd.services.Lightning.subscribeInvoices({
        add_index: 0,
        settle_index: 0,
    }).on("data", async (data) => {
        console.log("invoice change:", data.value, "for", data.memo, ":", data.payment_request);
        if (data.settled) {
            // Check if the invoice exists in the database.
            const existingInvoice = false;

            // If the invoice exists, update it in the database.
            if (existingInvoice) {
                // update db
            } else {
                console.log("Invoice not found in the database");
            }
        }
    }).on("error", (err) => {
        console.log(err);
    });
};

module.exports = {
  connect,
  getBalance,
  getChannelBalance,
  createInvoice,
  payInvoice,
  invoiceEventStream,
};

