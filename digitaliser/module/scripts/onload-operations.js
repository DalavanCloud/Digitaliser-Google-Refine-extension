[
  {
    "op": "core/column-addition",
    "description": "Create column URL at index 1 based on column id using expression grel:\"http://api.digitaliser.dk/rest/resources/\"+value",
    "engineConfig": {
      "facets": [],
      "mode": "row-based"
    },
    "newColumnName": "URL",
    "columnInsertIndex": 1,
    "baseColumnName": "id",
    "expression": "grel:\"http://api.digitaliser.dk/rest/resources/\"+value",
    "onError": "set-to-blank"
  },
  {
    "op": "core/column-addition-by-fetching-urls",
    "description": "Create column data at index 2 by fetching URLs based on column URL using expression grel:value",
    "engineConfig": {
      "facets": [],
      "mode": "row-based"
    },
    "newColumnName": "data",
    "columnInsertIndex": 2,
    "baseColumnName": "URL",
    "urlExpression": "grel:value",
    "onError": "set-to-blank",
    "delay": 5000
  },
  {
    "op": "core/column-addition",
    "description": "Create column TitleText at index 3 based on column data using expression grel:value.parseHtml().select(\"Resource\")[0].select(\"TitleText\")[0].toString()",
    "engineConfig": {
      "facets": [],
      "mode": "row-based"
    },
    "newColumnName": "TitleText",
    "columnInsertIndex": 3,
    "baseColumnName": "data",
    "expression": "grel:value.parseHtml().select(\"Resource\")[0].select(\"TitleText\")[0].toString()",
    "onError": "set-to-blank"
  },
  {
    "op": "core/column-removal",
    "description": "Remove column TitleText",
    "columnName": "TitleText"
  },
  {
    "op": "core/column-addition",
    "description": "Create column titletext at index 3 based on column data using expression grel:value.parseHtml().select(\"Resource\")[0].select(\"TitleText\")[0].toString().replace(\"<titletext>\",\"\").replace(\"</titletext>\",\"\")",
    "engineConfig": {
      "facets": [],
      "mode": "row-based"
    },
    "newColumnName": "titletext",
    "columnInsertIndex": 3,
    "baseColumnName": "data",
    "expression": "grel:value.parseHtml().select(\"Resource\")[0].select(\"TitleText\")[0].toString().replace(\"<titletext>\",\"\").replace(\"</titletext>\",\"\")",
    "onError": "set-to-blank"
  },
  {
    "op": "core/column-addition",
    "description": "Create column bodytext at index 3 based on column data using expression grel:value.parseHtml().select(\"Resource\")[0].select(\"BodyText\")[0].toString().replace(\"<bodytext>\",\"\").replace(\"</bodytext>\",\"\")",
    "engineConfig": {
      "facets": [],
      "mode": "row-based"
    },
    "newColumnName": "bodytext",
    "columnInsertIndex": 3,
    "baseColumnName": "data",
    "expression": "grel:value.parseHtml().select(\"Resource\")[0].select(\"BodyText\")[0].toString().replace(\"<bodytext>\",\"\").replace(\"</bodytext>\",\"\")",
    "onError": "set-to-blank"
  },
  {
    "op": "core/column-addition",
    "description": "Create column OwnerGroup at index 3 based on column data using expression grel:value.parseHtml().select(\"Resource\")[0].select(\"ResourceOwnerGroupHandle\")[0].select(\"TitleText\")[0].toString().replace(\"<titletext>\",\"\").replace(\"</titletext>\",\"\")",
    "engineConfig": {
      "facets": [],
      "mode": "row-based"
    },
    "newColumnName": "OwnerGroup",
    "columnInsertIndex": 3,
    "baseColumnName": "data",
    "expression": "grel:value.parseHtml().select(\"Resource\")[0].select(\"ResourceOwnerGroupHandle\")[0].select(\"TitleText\")[0].toString().replace(\"<titletext>\",\"\").replace(\"</titletext>\",\"\")",
    "onError": "set-to-blank"
  },
  {
    "op": "core/column-addition",
    "description": "Create column CreatedDateTime at index 3 based on column data using expression grel:value.parseHtml().select(\"Resource\")[0].select(\"CreatedDateTime\")[0].toString().replace(\"<createddatetime>\",\"\").replace(\"</createddatetime>\",\"\")",
    "engineConfig": {
      "facets": [],
      "mode": "row-based"
    },
    "newColumnName": "CreatedDateTime",
    "columnInsertIndex": 3,
    "baseColumnName": "data",
    "expression": "grel:value.parseHtml().select(\"Resource\")[0].select(\"CreatedDateTime\")[0].toString().replace(\"<createddatetime>\",\"\").replace(\"</createddatetime>\",\"\")",
    "onError": "set-to-blank"
  },
  {
    "op": "core/column-addition",
    "description": "Create column Published code at index 3 based on column data using expression grel:substring(value.parseHtml().select(\"Resource\")[0].select(\"PublishedState \")[0].select(\"[publishedDateTime]\").toString(),value.parseHtml().select(\"Resource\")[0].select(\"PublishedState \")[0].select(\"[publishedDateTime]\").toString().indexOf(\"publishedstatecode=\")+20).replace(\"\\\" \\/>\",\"\")",
    "engineConfig": {
      "facets": [],
      "mode": "row-based"
    },
    "newColumnName": "Published code",
    "columnInsertIndex": 3,
    "baseColumnName": "data",
    "expression": "grel:substring(value.parseHtml().select(\"Resource\")[0].select(\"PublishedState \")[0].select(\"[publishedDateTime]\").toString(),value.parseHtml().select(\"Resource\")[0].select(\"PublishedState \")[0].select(\"[publishedDateTime]\").toString().indexOf(\"publishedstatecode=\")+20).replace(\"\\\" \\/>\",\"\")",
    "onError": "set-to-blank"
  },
  {
    "op": "core/column-removal",
    "description": "Remove column Published code",
    "columnName": "Published code"
  },
  {
    "op": "core/column-addition",
    "description": "Create column publishedStateCode at index 3 based on column data using expression grel:substring(value.parseHtml().select(\"Resource\")[0].select(\"PublishedState\")[0].select(\"[publishedStateCode]\").toString(),value.parseHtml().select(\"Resource\")[0].select(\"PublishedState\")[0].select(\"[publishedStateCode]\").toString().indexOf(\"publishedstatecode=\")+20).replace(\"\\\" \\/>\",\"\")",
    "engineConfig": {
      "facets": [],
      "mode": "row-based"
    },
    "newColumnName": "publishedStateCode",
    "columnInsertIndex": 3,
    "baseColumnName": "data",
    "expression": "grel:substring(value.parseHtml().select(\"Resource\")[0].select(\"PublishedState\")[0].select(\"[publishedStateCode]\").toString(),value.parseHtml().select(\"Resource\")[0].select(\"PublishedState\")[0].select(\"[publishedStateCode]\").toString().indexOf(\"publishedstatecode=\")+20).replace(\"\\\" \\/>\",\"\")",
    "onError": "set-to-blank"
  },
  {
    "op": "core/column-addition",
    "description": "Create column publishedDateTime at index 3 based on column data using expression grel:substring(value.parseHtml().select(\"Resource\")[0].select(\"PublishedState\")[0].select(\"[publishedDateTime]\").toString(),value.parseHtml().select(\"Resource\")[0].select(\"PublishedState\")[0].select(\"[publishedDateTime]\").toString().indexOf(\"publishedDateTime=\")+36,value.parseHtml().select(\"Resource\")[0].select(\"PublishedState\")[0].select(\"[publishedDateTime]\").toString().indexOf(\"publishedstatecode\")).replace(\"\\\"\",\"\")",
    "engineConfig": {
      "facets": [],
      "mode": "row-based"
    },
    "newColumnName": "publishedDateTime",
    "columnInsertIndex": 3,
    "baseColumnName": "data",
    "expression": "grel:substring(value.parseHtml().select(\"Resource\")[0].select(\"PublishedState\")[0].select(\"[publishedDateTime]\").toString(),value.parseHtml().select(\"Resource\")[0].select(\"PublishedState\")[0].select(\"[publishedDateTime]\").toString().indexOf(\"publishedDateTime=\")+36,value.parseHtml().select(\"Resource\")[0].select(\"PublishedState\")[0].select(\"[publishedDateTime]\").toString().indexOf(\"publishedstatecode\")).replace(\"\\\"\",\"\")",
    "onError": "set-to-blank"
  },
  {
    "op": "core/column-addition",
    "description": "Create column TagHandle at index 3 based on column data using expression grel:forEach(value.parseHtml().select(\"Resource\")[0].select(\"ResourceTaggedByHandleCollection\")[0].select(\"TagHandle\"),e,e.select(\"LabelText\"))",
    "engineConfig": {
      "facets": [],
      "mode": "row-based"
    },
    "newColumnName": "TagHandle",
    "columnInsertIndex": 3,
    "baseColumnName": "data",
    "expression": "grel:forEach(value.parseHtml().select(\"Resource\")[0].select(\"ResourceTaggedByHandleCollection\")[0].select(\"TagHandle\"),e,e.select(\"LabelText\"))",
    "onError": "set-to-blank"
  },
  {
    "op": "core/column-removal",
    "description": "Remove column TagHandle",
    "columnName": "TagHandle"
  },
  {
    "op": "core/column-addition",
    "description": "Create column TagHandle at index 3 based on column data using expression grel:forEach(value.parseHtml().select(\"Resource\")[0].select(\"ResourceTaggedByHandleCollection\")[0].select(\"TagHandle\"),e,e.select(\"LabelText\")).join(\"\").toString()",
    "engineConfig": {
      "facets": [],
      "mode": "row-based"
    },
    "newColumnName": "TagHandle",
    "columnInsertIndex": 3,
    "baseColumnName": "data",
    "expression": "grel:forEach(value.parseHtml().select(\"Resource\")[0].select(\"ResourceTaggedByHandleCollection\")[0].select(\"TagHandle\"),e,e.select(\"LabelText\")).join(\"\").toString()",
    "onError": "set-to-blank"
  },
  {
    "op": "core/column-addition",
    "description": "Create column ArtefactHandle at index 3 based on column data using expression grel:forEach(value.parseHtml().select(\"Resource\")[0].select(\"ResourceArtefactHandleCollection\")[0].select(\"ArtefactHandle\"),e,e.select(\"LabelText\")).join(\"\").toString()",
    "engineConfig": {
      "facets": [],
      "mode": "row-based"
    },
    "newColumnName": "ArtefactHandle",
    "columnInsertIndex": 3,
    "baseColumnName": "data",
    "expression": "grel:forEach(value.parseHtml().select(\"Resource\")[0].select(\"ResourceArtefactHandleCollection\")[0].select(\"ArtefactHandle\"),e,e.select(\"LabelText\")).join(\"\").toString()",
    "onError": "set-to-blank"
  },
  {
    "op": "core/column-addition",
    "description": "Create column ReferenceHandle at index 3 based on column data using expression grel:forEach(value.parseHtml().select(\"Resource\")[0].select(\"ResourceReferenceHandleCollection\")[0].select(\"ReferenceHandle \"),e,e.select(\"TitleText\")).join(\"\").toString()",
    "engineConfig": {
      "facets": [],
      "mode": "row-based"
    },
    "newColumnName": "ReferenceHandle",
    "columnInsertIndex": 3,
    "baseColumnName": "data",
    "expression": "grel:forEach(value.parseHtml().select(\"Resource\")[0].select(\"ResourceReferenceHandleCollection\")[0].select(\"ReferenceHandle \"),e,e.select(\"TitleText\")).join(\"\").toString()",
    "onError": "set-to-blank"
  }
]