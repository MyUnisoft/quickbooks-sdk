import API from "./API";

// Require Internal Dependencies
import * as QB from "../type";
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

export class Attachable extends API<IAttachable> {
  constructor(parent: Quickbooks) {
    super(parent, { entityName: "attachable" });
  }
}
