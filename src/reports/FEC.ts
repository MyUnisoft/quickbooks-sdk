import { Reports } from "./reports";

type attachmentEnum = "TEMPORARY" | "NONE";

interface FECReportOptions {
  attachment?: attachmentEnum;
  withQboIdentifier?: boolean;
  start_date?: string;
  end_date?: string;
  add_due_date?: boolean;
}


export class FEC extends Reports {

}

// export function FEC(options: FECReportOptions) {

// }
