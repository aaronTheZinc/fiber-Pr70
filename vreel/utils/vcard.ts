import {
    TextType,
    TextListType,
    DateTimeType,
    IntegerType,
    LanguageTagType,
    URIType,
    SexType,
    SpecialValueType,
    ValueParameter,
    PrefParameter,
    TypeParameter,
    FNProperty,
    NProperty,
    BdayProperty,
    AnniversaryProperty,
    GenderProperty,
    AdrProperty,
    TelProperty,
    EmailProperty,
    LangProperty,
    TzProperty,
    GeoProperty,
    OrgProperty,
    URLProperty,
    KeyProperty,
    VCARD,
} from "vcard4";
import type { User } from "../types"

export default function GenerateVcard(user: User): string {
    const full_name = new FNProperty([], new TextType(`${user.first_name} ${user.last_name}`));
    const email = new EmailProperty(
        [new TypeParameter(new TextType("work"), "emailproperty")],
        new TextType(user.email)
    );
    const org = new OrgProperty(
        [new TypeParameter(new TextType("work"), "orgproperty")],
        new SpecialValueType([new TextType("Viagenie")], "orgproperty")
    );
    const vc = new VCARD([
        full_name,
        email,
        org

    ]);

    return vc.repr()
}