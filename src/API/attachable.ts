import API from "./API";

// Require Internal Dependencies
import * as QB from "../type";
import Quickbooks from "..";

interface AttachableRef {
  EntityRef: {
    value: string;
    type: "Invoice";
  };
  IncludeOnSend: boolean;
}

interface IAttachable extends QB.RootEntityProperties {
  FileName: string;
  FileAccessUri: string;
  TempDownloadUri: string;
  Size: number;
  ContentType: string;
  Category: string;
  AttachableRef: AttachableRef[];
}

export default class Attachable extends API<IAttachable> {
  constructor(parent: Quickbooks) {
    super(parent, {
      entityName: "attachable"
    });
  }
}
