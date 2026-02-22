router.post("/webhook", async (req, res) => {
  const event = req.body;

  console.log("Chapa Webhook:", event);

  // Verify transaction status here
  // Update Transaction.status = SUCCESS

  res.sendStatus(200);
});