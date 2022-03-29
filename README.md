<p align="center"><h1 align="center">
  Quickbooks Node.js SDK
</h1>

<p align="center">
  An Intuit Quickbooks SDK for Node.js with modern `async/await` API 💃.
</p>

<p align="center">
    <a href="https://github.com/MyUnisoft/quickbooks-sdk"><img src="https://img.shields.io/github/package-json/v/MyUnisoft/quickbooks-sdk?style=flat-square" alt="npm version"></a>
    <a href="https://github.com/MyUnisoft/quickbooks-sdk"><img src="https://img.shields.io/github/license/MyUnisoft/quickbooks-sdk?style=flat-square" alt="license"></a>
    <a href="https://github.com/MyUnisoft/quickbooks-sdk"><img src="https://img.shields.io/github/languages/code-size/MyUnisoft/quickbooks-sdk?style=flat-square" alt="size"></a>
    <a href="./SECURITY.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg?style=flat-square" alt="Responsible Disclosure Policy" /></a>
</p>

## 📢 About

Modern Intuit Quickbooks Node.js API SDK. Some API has been inspired by the [node-quickbooks](https://github.com/mcohen01/node-quickbooks) package.

> ⚠️ We have mainly implemented the features necessary for the use of MyUnisoft. Feel free to pull-request new or missing API.

## 🔬 Features.

- Modern `async/await` API.
- First class support of TypeScript.
- Implement FEC API.
- Use [undici](https://undici.nodejs.org/#/) under the hood for http request.
- Built-in Quickbooks Rate limitation.

## 🚧 Requirements

- [Node.js](https://nodejs.org/en/) v14 or higher.

## 🚀 Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @myunisoft/quickbooks-node-sdk
# or
$ yarn add @myunisoft/quickbooks-node-sdk
```

## 📚 Usage example

```js
import Quickbooks from "@myunisoft/quickbooks-node-sdk";

// Retrieve the token with the `intuit-oauth` package (OAuth2).
const accessToken = "YourToken";

const Qb = new Quickbooks({
  accessToken,
  realmId: "0123456789",
  sandbox: false
});

const invoices = await Qb.Invoice.find();
console.log(invoices);

const account = await Qb.Account.findOne(42);
console.log(account);

const FECs = await Qb.Reports.FEC({
  start_date: "YYYY-MM-DD"
});
console.log(FECs);
```

The Quickbooks constructor options are described by the following TypeScript interface:

```ts
export interface QuickbooksOptions {
  realmId: string;
  accessToken: string;
  sandbox: boolean;
  /**
   * @default 63
   */
  minorVersion?: number;
}
```

---

You can use the `.find(criteria?: SQLConditionalCriteria | SQLCriteria)` method combined with criteria to dynamically build SQL:
```ts
const attachables = await Qb.Attachable.find({
  and: [
    { field: "AttachableRef.EntityRef.Type", value: "Invoice", operator: "=" },
    { field: "AttachableRef.EntityRef.value", value: 1, operator: "=" }
  ]
})
```

<details><summary>TypeScript definition</summary>

```ts
export type SQLOperator = "<" | ">" | "=" | "<=" | ">=" | "ILIKE" | "LIKE";

export interface SQLConditionalCriteria {
  or?: SQLCriteria[] | SQLConditionalCriteria[];
  and?: SQLCriteria[] | SQLConditionalCriteria[];
}

export interface SQLCriteria {
  field: string;
  value: string | number | boolean | null;
  operator: SQLOperator;
}
```

</details>

## API

### Basic API function

#### API Class
```ts
import * as QB from "../type";

abstract class API<T> {
  async find(criteria?: SQLConditionalCriteria | SQLCriteria): Promise<T[]>
  async findOne(id: number | QB.Reference): Promise<T>
  async query(sql: string): Promise<T[]>
  async create(entity: T): Promise<T | unknown>
}
```

---

<details>
  <summary>Recurent Interface types</summary>

  From `type.ts`
  ```ts
  export interface Reference {
    value: string;
    name?: string;
  }

  export interface AbstractLine<T> {
    Id: string;
    DetailType: T;
    Amount: number;
    Description?: string;
    LineNum?: number;
  }

  export interface Addr {
    Id: number;
    Line1: string;
    Line2?: string;
    Line3?: string;
    Line4?: string;
    Line5?: string;
    City: string;
    Country: string;
    PostalCode: string;
    Lat: string;
    Long: string;
    CountrySubDivisionCode?: string;
  }

  export interface DateType {
    date?: string;
  }

  export interface TaxLine {
    Amount?: number;
    DetailType: "TaxLineDetail";
    TaxLineDetail: {
      TaxRateRef: Reference;
      NetAmountTaxable?: number;
      PercentBased?: boolean;
      TaxInclusiveAmount?: number;
      OverrideDeltaAmount?: number;
      TaxPercent?: number;
    };
  }

  export interface TxnTaxDetail {
    TxnTaxCodeRef?: Reference;
    TotalTax?: number;
    TaxLine?: TaxLine[];
  }

  export interface CustomField {
    DefinitionId?: string;
    StringValue?: string;
    Type?: "StringType";
    Name?: string;
  }

  export interface RootEntityProperties {
    Id?: string;
    domain: string;
    sparse: boolean;
    SyncToken?: string;
    MetaData: {
      CreateTime: string;
      LastUpdatedTime: string;
    };
    DocNumber?: string;
  }

  export interface MarkupInfo {
    PriceLevelRef?: Reference;
    Percent?: number;
    MarkUpIncomeAccountRef?: Reference;
  }

  export type BillableStatusEnum = "Billable" | "NotBillable" | "HadBeenBilled";
  export type GlobalTaxCalculationEnum = "TaxExcluded" | "TaxInclusive" | "NotApplicable";

  export interface LinkedTxn {
    TxnId: string;
    TxnType: string;
    TxnLineId?: string;
  }

  interface SalesItemLineDetail {
    TaxInclusiveAmt?: number;
    DiscountAmt?: number;
    ItemRef?: Reference;
    ClassRef?: Reference;
    TaxCodeRef?: Reference;
    MarkupInfo?: MarkupInfo;
    ItemAccountRef: Reference;
    ServiceDate: DateType;
    DiscountRate: number;
    Qty?: number;
    UnitPrice?: number;
    TaxClassificaitionRef: Reference;
  }
  type SalesItemLine = AbstractLine<"SalesItemLineDetail"> & {SalesItemLineDetail: SalesItemLineDetail}

  interface GroupLineDetail {
    Quantity?: number;
    Line: SalesItemLineDetail[];
    GroupItemRef: Reference;
  }
  type GroupLine = Omit<AbstractLine<"GroupLineDetail">, "Amount"> & {GroupLineDetail: GroupLineDetail}


  interface DescriptionOnlyLineDetail {
    TaxCodeRef?: Reference;
    Date?: DateType
  }
  type DescriptionOnlyLine = AbstractLine<"DescriptionOnlyLineDetail"> & {DescriptionOnlyLineDetail: DescriptionOnlyLineDetail}


  interface DiscountLineDetail {
    ClassRef?: Reference;
    TaxCodeRef?: Reference;
    DiscountAccountRef?: Reference;
    PercentBased?: boolean;
    DismountPercent?: number;
  }
  type DiscountLine = AbstractLine<"DiscountLineDetail"> & {DiscountLineDetail: DiscountLineDetail}

  interface SubTotalLineDetail {
    ItemRef: Reference;
  }
  type SubTotalLine = AbstractLine<"SubTotalLineDetail"> & {SubTotalLineDetail: SubTotalLineDetail}


  export type InvoiceLine = SalesItemLine | GroupLine |
  DescriptionOnlyLine | DiscountLine | SubTotalLine
  ```
</details>

---

### FEC

<details><summary>FEC Options</summary>

```ts
export interface FECReportOptions {
  attachment?: "TEMPORARY" | "NONE";
  withQboIdentifier?: boolean;
  start_date: string;
  end_date?: string;
  add_due_date?: boolean;
}
```
</details>

<details><summary>FEC Interface</summary>

```ts
export interface FECRowColData {
  id?: string;
  value: string;
  href?: string;
}

export interface FECRowColumn {
  ColType: "Account" | "Money";
  ColTitle?: string;
  MetaData?: {
    Name?: string;
    Value: string;
  }
}

export interface FECRow {
  type: "Data" | "Section";
  ColData: FECRowColData[];
  Summary?: any;
  Rows?: any;
  Header?: any;
}

export interface FEC {
  Header: {
    Customer?: string;
    ReportName?: string;
    Vendor?: string;
    Options?: {
      Name?: string;
      Value?: string;
    }
    Item?: string;
    Employee?: string;
    ReportBasis?: "Cash" | "Accrual";
    StartPeriod?: string;
    Class?: string;
    Currency?: string;
    EndPeriod?: string;
    Time?: string;
    Department?: string;
    SummarizeColumnsBy?: string;
  },
  Rows: {
    Row: FECRow;
  },
  Columns: {
    Column: FECRowColumn[];
  }
}
```
</details>



---
### Account

<details>
  <summary>IAccount Interface</summary>

  From `API/account.ts`
  ```ts
  import * as QB from "../type";

  interface IAccount extends QB.RootEntityProperties {
    Name: string;
    AcctNum?: string;
    CurrencyRef: QB.Reference;
    ParentRef: QB.Reference;
    Description?: string;
    Active?: boolean;
    SubAccount?: boolean;
    Classification?: string;
    FullyQualifiedName?: string;
    TxnLocationType?: "WithinFrance" | "FranceOverseas" | "OutsideFranceWithEU" | "OutsideEU";
    AccountType: string;
    CurrentBalanceWithSubAccounts?: number;
    AccountAlias: string;
    TaxCodeRef?: QB.Reference;
    AccountSubType: string;
    CurrentBalance: number;
  }
  ```
</details>


### Attachable

<details>
  <summary>IAttachable Interface</summary>

  From `API/attachable.ts`
  ```ts
  import Quickbooks from "../quickbooks";

  interface AttachableRef {
    IncludeOnSend?: boolean;
    LineInfo?: string;
    NoRefOnly?: boolean;
    CustomField?: QB.CustomField[];
    Inactive?: boolean;
    EntityRef?: {
      value: string;
      type?: "Invoice";
    };
  }

  interface IAttachable extends QB.RootEntityProperties {
    FileName: string;
    Note?: string;
    Category?: "Contact Photo" | "Document" | "Image" | "Receipt" | "Signature" | "Sound" | "Other";
    ContentType?: string;
    PlaceName?: string;
    AttachableRef: AttachableRef[];
    Long?: string;
    Tag?: string;
    Lat?: string;
    FileAccessUri?: string;
    Size?: number;
    ThumbnailFileAccessUri?: string;
    TempDownloadUri?: string;
    ThumbnailTempDownloadUri?: string;
  }
  ```
</details>

### CreditMemo

<details>
  <summary>ICreditMemo Interface</summary>

  From `API/creditMemo.ts`
  ```ts
  import Quickbooks from "../quickbooks";

  interface ICreditMemo extends QB.RootEntityProperties {
    Line: QB.InvoiceLine[];
    CustomerRef: QB.Reference;
    CurrencyRef?: QB.Reference;
    BillEmail?: {
      Address?: string;
    };
    TxnDate?: string;
    CustomField?: QB.CustomField[];
    ClassRef?: QB.Reference;
    PrintStatus?: string;
    SalesTermRef?: QB.Reference;

    GlobalTaxCalculation?: QB.GlobalTaxCalculationEnum;
    TotalAmt?: string;
    InvoiceRef?: QB.Reference;
    TransactionLocationType?: "WithinFrance" | "FranceOverseas" | "OutsideFranceWithEU" | "OutsideEU";
    ApplyTaxAfterDiscount?: boolean;
    DocNumber?: string;
    PrivateNote?: string;
    CustomerMemo?: string;
    TxnTaxDetail?: QB.TxnTaxDetail;
    PaymentMethodRef?: QB.Reference;
    ExchangeRate?: number;
    ShipAddr?: QB.Addr;
    DepartmentRef?: QB.Reference;
    EmailStatus?: string;
    BillAddr?: QB.Addr;
    HomeBalance?: number;
    RemainingCredit?: number;
    RecurDataRef?: QB.Reference;
    TaxExemptionRef?: QB.Reference;
    Balance?: number;
    HomeTotalAmt?: number;
  }
  ```
</details>

### Customer

<details>
  <summary>ICustomer Interface</summary>

  From `API/customer.ts`
  ```ts
  import Quickbooks from "../quickbooks";

  interface ICustomer extends QB.RootEntityProperties {
    DisplayName?: string;
    Title?: string;
    GivenName?: string;
    MiddleName?: string;
    Suffix?: string;
    FamilyName?: string;
    PrimaryEmailAddr?: {
      Address?: string;
    };
    ResaleNum?: string;
    SecondaryTaxIdentifier?: string;
    ARAccountRef?: QB.Reference
    DefaultTaxCodeRef: QB.Reference;
    PreferredDeliveryMethod?: string;
    GSTIN?: string;
    SalesTermRef?: QB.Reference;
    CustomerTypeRef?: QB.Reference;
    Fax?: {
      FreeFormNumber?: string;
    }
    BusinessNumber?: string;
    BillWithParent?: boolean;
    CurrencyRef?: QB.Reference;
    Mobile?: {
      FreeFormNumber?: string;
    }
    Job?: boolean;
    BalanceWithJobs?: number;
    PrimaryPhone?: {
      FreeFormNumber: string;
    };
    OpenBalanceDate?: QB.DateType;
    Taxable?: boolean;
    AlternatePhone?: {
      FreeFormNumber?: string;
    }
    ParentRef: QB.Reference;
    Notes?: string;
    WebAddr?: {
      URI?: string;
    }
    Active?: boolean;
    CompanyName?: string;
    Balance?: number;
    ShipAddr?: QB.Addr;
    PaymentMethodRef?: QB.Reference;
    IsProject?: boolean;
    Source?: string;
    PrimaryTaxIdentifier?: string;
    GSTRegistrationType?: "GST_REG_REG" | "GST_REG_COMP" | "GST_UNREG" | "CONSUMER" | "OVERSEAS" | "SEZ";
    PrintOnCheckName?: string;
    BillAddr?: QB.Addr;
    FullyQualifiedName?: string;
    Level?: number;
    TaxExemptionReasonId?: number;
  }
  ```
</details>

### Invoice

<details>
  <summary>IInvoice Interface</summary>

  From `API/invoice.ts`
  ```ts
  import * as QB from "../type";

  interface InvoiceLinkedTxn {
    TxnId: string;
    TxnLineId?: string;
    TxnType: "Estimate" | "TimeActivity" | "PurchaseOrder" | "BillPaymentCheck";
  }

  interface IInvoice extends QB.RootEntityProperties {
    Line: QB.InvoiceLine[];
    CustomerRef: QB.Reference;
    CurrencyRef?: QB.Reference;
    DocNumber?: string;
    BillEmail?: {
      Address?: string;
    };
    TxnDate: string;
    ShipFromAddr?: QB.Addr;
    ShipDate?: string;
    TrackingNum?: number;
    ClassRef?: QB.Reference;
    PrintStatus?: string;
    SalesTermRef?: QB.Reference;
    TxnSource?: string;
    LinkedTxn?: InvoiceLinkedTxn[];
    DepositeToAccountRef?: QB.Reference;
    GlobalTaxCalculation?: QB.GlobalTaxCalculationEnum;
    AllowOnlineACHPayment?: boolean;
    TransactionLocationType?: string;
    DueDate?: QB.DateType;
    PrivateNote?: string;
    BillEmailCc?: {
      Address?: string;
    }
    CustomerMemo?: QB.Reference;
    EmailStatus?: string;
    ExchangeRate?: number;
    Deposit?: number;
    TxnTaxDetail?: QB.TxnTaxDetail;
    AllowOnlineCreditCardPayment?: boolean;
    CustomField?: QB.CustomField[];
    ShipAddr?: QB.Addr;
    DepartmentRef?: QB.Reference;
    BillEmailBcc?: {
      Address?: string;
    }
    ShipMethodRef?: QB.Reference;
    BillAddr?: QB.Addr;
    ApplyTaxAfterDiscount?: boolean;
    HomeBalance?: number;
    DeliveryInfo?: {
      DeliveryType?: "Email" | "Tradeshift";
      DeliveryTime?: {
        dateTime?: string;
      }
    }
    TotalAmt?: string;
    InvoiceLink?: string;
    RecurDataRef: QB.Reference;
    TaxExemptionRef?: QB.Reference;
    Balance?: number;
    HomeTotalAmt?: number;
    FreeFormAddress?: boolean;
    AllowOnlinePayment?: boolean;
    AllowIPNPayment?: boolean;
  }
  ```
</details>

### Item

<details>
  <summary>IItem Interface</summary>

  From `API/item.ts`
  ```ts
  import Quickbooks from "../quickbooks";

  interface IItem extends QB.RootEntityProperties {
    ItemCategoryType: "Service" | "Service";
    Name: string;
    InvStartDate?: QB.DateType;
    Type: "Service" | "Inventory" | "NonInventory";
    QtyOnHand?: number;
    AssetAccountRef?: QB.Reference;
    Sku?: string;
    SalesTaxIncluded?: boolean;
    TrackQtyOnHand?: boolean;
    SalesTaxCodeRef?: QB.Reference;
    ClassRef?: QB.Reference;
    Source?: string;
    PurchaseTaxIncluded?: boolean;
    Description?: string;
    AbatementRate?: number;
    SubItem?: boolean;
    Taxable?: boolean;
    UQCDisplayText?: string;
    ReorderPoint?: number;
    PurchaseDesc?: string;
    PrefVendorRef?: QB.Reference;
    Active?: boolean;
    UQCId?: string;
    ReverseChargeRate?: number;
    PurchaseTaxCodeRef?: QB.Reference;
    ServiceType?: string;
    PurchaseCost?: number;
    ParentRef: QB.Reference;
    UnitPrice?: number;
    FullyQualifiedName?: string;
    ExpenseAccountRef?: QB.Reference;
    Level?: number;
    IncomeAccountRef?: QB.Reference;
    TaxClassificationRef?: QB.Reference;
  }
  ```
</details>

### Purchase

<details>
  <summary>IPurchase Interface</summary>

  From `API/purchase.ts`
  ```ts
  import Quickbooks from "../quickbooks";

  interface ItemBasedExpenseLineDetail {
    TaxInclusiveAmt?: number;
    ItemRef?: QB.Reference;
    CustomerRef?: QB.Reference;
    PriceLevelRef?: QB.Reference;
    ClassRef?: QB.Reference;
    TaxCodeRef?: QB.Reference;
    MarkupInfo?: QB.MarkupInfo;
    BillableStatus?: QB.BillableStatusEnum;
    Qty?: number;
    UnitPrice?: number;
  }

  interface AccountBasedExpenseLineDetail {
    AccountRef: QB.Reference;
    TaxAmount?: number;
    TaxInclusiveAmt?: number;
    ClassRef?: QB.Reference;
    TaxCodeRef?: QB.Reference;
    MarkupInfo?: QB.MarkupInfo;
    BillableStatus?: QB.BillableStatusEnum;
    CustomerRef?: QB.Reference;
  }

  type AccountBasedExpenseLine = QB.AbstractLine<"AccountBasedExpenseLineDetail">
    & { AccountBasedExpenseLineDetail: AccountBasedExpenseLineDetail; };
  type ItemBasedExpenseLine = QB.AbstractLine<"ItemBasedExpenseLineDetail">
    & {
      ItemBasedExpenseLineDetail: ItemBasedExpenseLineDetail;
      LinkedTxn?: QB.LinkedTxn[];
    };

  type PurchaseLine = AccountBasedExpenseLine | ItemBasedExpenseLine;

  interface IPurchase extends QB.RootEntityProperties {
    Line: PurchaseLine[];
    PaymentType: "Cash" | "Check" | "CreditCard";
    AccountRef: QB.Reference;
    CurrencyRef?: QB.Reference;
    TxnDate?: string;
    PrintStatus: string;
    RemitToAddr?: QB.Addr;
    TxnSource?: string;
    LinkedTxn?: QB.LinkedTxn[];
    GlobalTaxCalculation?: QB.GlobalTaxCalculationEnum;
    TransactionLocationType?: "WithinFrance" | "FranceOverseas" | "OutsideFranceWithEU" | "OutsideEU";
    DocNumber?: string;
    PrivateNote?: string;
    Credit?: boolean;
    TxnTaxDetail?: QB.TxnTaxDetail;
    PaymentMethodRef?: QB.Reference;
    PurchaseEx: Record<string, unknown>
    EchangeRate?: number;
    DepartmentRef?: QB.Reference;
    EntityRef?: QB.Reference;
    IncludeInAnnualTPAR?: boolean;
    TotalAmt?: string;
    CustomField?: any[];
  }
  ```
</details>

### TaxRate

<details>
  <summary>ITaxRate Interface</summary>

  From `API/taxRate.ts`
  ```ts
  import Quickbooks from "../quickbooks";

  interface EffectiveTaxRate {
    RateValue: number;
    EffectiveDate: string;
  }

  interface ITaxRate extends QB.RootEntityProperties {
    RateValue?: string;
    Name?: string;
    AgencyRef?: QB.Reference;
    SpecialTaxType?: string;
    EffectiveTaxRate?: EffectiveTaxRate[];
    DisplayType?: string;
    TaxReturnLineRef: QB.Reference;
    Active: boolean;
    OriginalTaxRate?: string;
    Description: string;
  }
  ```
</details>

### Vendor

<details>
  <summary>IVendor Interface</summary>

  From `API/vendor.ts`
  ```ts
  import Quickbooks from "../quickbooks";

  interface IVendor extends QB.RootEntityProperties {
    Title?: string;
    GivenName?: string;
    MiddleName?: string;
    Suffix?: string;
    FamilyName?: string;
    PrimaryEmailAddr?: {
      Address?: string;
    }
    DisplayName?: string;
    OtherContactInfo?: {
      Type?: string;
      Telephone?: string;
    }
    APAccountRef?: QB.Reference;
    TermeRef?: QB.Reference;
    Source?: string;
    GSTIN?: string;
    T4AEligible?: boolean;
    Fax?: {
      FreeFormNumber?: string
    }
    BusinessNumber?: string;
    CurrencyRef?: QB.Reference;
    HasTPAR?: boolean;
    TaxReportingBasis?: string;
    Mobile?: {
      FreeFormNumber?: string;
    }
    PrimaryPhone?: {
      FreeFormNumber?: string;
    }
    Active?: boolean;
    AlternatePhone?: {
      FreeFormNumber?: string;
    }
    Vendor1099?: boolean;
    CostRate?: string;
    BillRate?: number;
    WebAddr?: {
      URI?: string;
    }
    T5018Eligible?: boolean;
    CompanyName?: string
    VendorPaymentBankDetail?: {
      BankAccountName?: string;
      BankBranchIdentifier: string;
      BankAccountNumber: string;
      StatementText: string;
    }
    TaxIdentifier?: string;
    AcctNum?: string;
    GSTRegistrationType?: "GST_REG_REG" | "GST_REG_COMP" | "GST_UNREG" | "CONSUMER" | "OVERSEAS" | "SEZ" | "DEEMED";
    PrintOnCheckName?: string;
    BillAddr?: QB.Addr;
    Balance: number;
  }
  ```
</details>

# License
MIT
