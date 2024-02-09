const router = require("express").Router();
const authenticate = require("../routers/middleware/authenticate");
const authenticateAdmin = require("../routers/middleware/authenticateAdmin");

const {getBalance, createInvoice, getChannelBalance, payInvoice } = require("../lnd.js");

// GET on-chain wallet balance
router.get("/balance", (req, res) => {
    getBalance()
        .then((balance) => { res.status(200).json(balance) })
        .catch((err) => { res.status(500).json(err)});
});

// GET Lightning wallet balance
router.get("/channelbalance", (req, res) => {
    getChannelBalance()
        .then((channelBalance) => { res.status(200).json(channelBalance) })
        .catch((err) => { res.status(500).json(err)});
});

// GET all invoices from the database
router.get("/invoices", (req, res) => {
    res.status(200).json({ message: "alive" });
});

// POST required info to create an invoice
router.post("/invoice", authenticate, (req, res) => {
    const { value, memo } = req.body;
    console.log(value, memo);
    createInvoice({ value, memo })
        .then((invoice) => { res.status(200).json({ invoice }); })
        .catch((err) => { res.status(500).json(err); })
});

// POST an invoice to pay
router.post("/pay", authenticateAdmin, async (req, res) => {
    const { payment_request } = req.body;
    console.log(payment_request);
    const pay = await payInvoice({ payment_request });
    if (pay.payment_error) {
        res.status(500).json(pay.payment_error);
    }

    if (pay?.payment_route) {
        res.status(200).json(pay);
    }
});

// export the router so we can initiate it in index.js
module.exports = router;

