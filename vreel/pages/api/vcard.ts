import { NextApiRequest as Request, NextApiResponse as Response } from "next";
import { getUserByUsername } from "../../graphql/query";
// import GenerateVcard from "../../utils/vcard";
import vCardsJS from "vcards-js";
const kevImg = require("../../public/kev.jpeg");

//create a new vCard
var vCard = vCardsJS();

export default async function handler(req: Request, res: Response) {
  const { username } = req.query;
  console.log("query", req.query);
  if (!username) {
    res.json({
      error: {
        message: "must provide an username.",
      },
    });
  } else {
    try {
      const user = await getUserByUsername(username.toString());
      // const vcard = GenerateVcard(user)
      vCard.firstName = "Kevin";
      vCard.middleName = "J";
      vCard.lastName = "Mosley";
      vCard.homeAddress.label = "Home Address";
      vCard.homeAddress.street = "123 Main Street";
      vCard.homeAddress.city = "Chicago";
      vCard.homeAddress.stateProvince = "IL";
      vCard.homeAddress.postalCode = "12345";
      vCard.homeAddress.countryRegion = "United States of America";
      vCard.organization = "Making Milionaires";
      vCard.workPhone = "312-555-1212";
      vCard.homePhone = "312-555-1313";
      vCard.cellPhone = "312-555-1414";
      vCard.pagerPhone = "312-555-1515";
      vCard.birthday = new Date(1994, 0, 1);
      vCard.title = "Software Developer";
      vCard.url = "https://kevinjmosley.com";
      vCard.note = "Notes for Kmos";
      // vCard.photo.embedFromFile(kevImg);
      // console.log('img', kevImg)

      res.setHeader("Content-Type", `text/vcard; name="${username}.vcf"`);
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${username}.vcf"`
      );

      res.send(vCard.getFormattedString());
    } catch (e) {
      res.json(e);
    }
  }
}
