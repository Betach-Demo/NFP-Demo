// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import Cors from "cors";
import initMiddleware from "../../utils/init-middleware";

export type Donation = {
  redirectUrl: string;
};

type Error = {
  error: {
    name: string;
    message: string;
  };
};

const cors = initMiddleware(Cors({ origin: "*" }));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Donation | Error>
) {
  try {
    await cors(req, res);
    const stripeClient = new Stripe(process.env.STRIPE_SECRET!, {
      apiVersion: "2020-08-27",
    });
    switch (req.method) {
      case "POST":
        const paymentSetting: any = {
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Donation to Alzheimer's Association",
                  description:
                    "Please join us as we continue our important work in providing Alzheimer's care and support and accelerating research.",
                },
                unit_amount: req.body.donationAmount * 100,
                tax_behavior: "inclusive",
              },
              quantity: 1,
            },
          ],
          success_url: "https://www.alz.org/",
          cancel_url: "https://www.alz.org/",
          mode: "payment",
          customer_email: req.body.email,
          metadata: {
            firstname: req.body.firstName,
            lastname: req.body.lastName,
          },
        };

        if (req.body.donationType === "subscription") {
          paymentSetting.line_items = [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Donation to Alzheimer's Association",
                  description:
                    "Please join us as we continue our important work in providing Alzheimer's care and support and accelerating research.",
                },
                unit_amount: req.body.donationAmount * 100,
                recurring: {
                  interval: "month",
                  interval_count: 1,
                },
                tax_behavior: "inclusive",
              },
              quantity: 1,
            },
          ];
          paymentSetting.mode = "subscription";
        }

        const session = await stripeClient.checkout.sessions.create(
          paymentSetting
        );

        if (session && session.url) {
          return res.status(200).json({ redirectUrl: session.url });
        }

        return res
          .status(400)
          .json({ error: { name: "Bad Request", message: "Bad request" } });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      error: { name: "Server Internal Error", message: error.message },
    });
  }
}
