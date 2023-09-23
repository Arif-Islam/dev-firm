// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client } from "../invoice";

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const data = JSON.stringify(client, null, 2);
    console.log(data);
    res.send({
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
}
