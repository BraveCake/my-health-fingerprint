import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import AddFieldModal, {
  AddFieldModalController,
  IAddFieldModalController
} from "@/components/templates/TemplateBuilder/modals/AddFieldModal";

export const templateDetailsInitialValues = {
  name: "",
  schema: [],
  printable: false,
  public: false,
};

export const collectionDetailsInitialValues = {
  name: "",
  description: "",
  icon: "",
  public: false,
  organization: "",
};

export interface TemplateComponent {
  _id: string;
  type: string;
  collection?: string;
}

export interface TemplateDetails {
  name: string;
  schema: Partial<TemplateComponent>[][];
  printable: boolean;
  public: boolean;
}

export interface CollectionDetails {
  name: string;
  description: string;
  icon: string;
  public: boolean;
  organization: string;
}

const TemplateBuilderContext = createContext<{
  templateDetails: TemplateDetails;
  collectionDetails: CollectionDetails;
  setTemplateDetails?: Dispatch<SetStateAction<TemplateDetails>>;
  setCollectionDetails?: Dispatch<SetStateAction<CollectionDetails>>;
  openModal: () => void;
  closeModal: () => void;
  appendRow: (columnsCount: number) => void;
  removeRow: (index: number) => void;
  updateColumn: (
    rowIndex: number,
    columnIndex: number,
    updateQuery: Partial<TemplateComponent>,
  ) => void;
} & IAddFieldModalController | null>(null);

export function TemplateBuilderContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [templateDetails, setTemplateDetails] = useState<TemplateDetails>(
    templateDetailsInitialValues
  );
  const [collectionDetails, setCollectionDetails] = useState<CollectionDetails>(
    collectionDetailsInitialValues
  );
  const fieldModalController = AddFieldModalController();

  const appendRow = (columnsCount: number) => {
    if (!columnsCount || columnsCount > 4) return;
    const row = [];
    for (let i = 0; i < columnsCount; i++) row.push({});
    setTemplateDetails({
      ...templateDetails,
      schema: [...templateDetails.schema, row],
    });
  };

  const removeRow = (index: number) => {
    setTemplateDetails({
      ...templateDetails,
      schema: templateDetails.schema.filter((_, idx) => idx != index),
    });
  };

  const updateColumn = (
    rowIndex: number,
    columnIndex: number,
    updateQuery: Partial<TemplateComponent>
  ) => {
    const tmpSchema = templateDetails.schema;
    if (tmpSchema[rowIndex]) {
      const columns = tmpSchema[rowIndex];
      if (columns) {
        columns[columnIndex] = {
          ...tmpSchema?.[rowIndex]?.[columnIndex],
          ...updateQuery,
        };
      }
    }
    setTemplateDetails({
      ...templateDetails,
      schema: tmpSchema,
    });
  }

  return (
    <TemplateBuilderContext.Provider
      value={{
        templateDetails,
        collectionDetails,
        setTemplateDetails,
        setCollectionDetails,
        appendRow,
        removeRow,
        updateColumn,
        ...fieldModalController
      }}
    >
      {children}
      <div>
       <AddFieldModal />
      </div>
    </TemplateBuilderContext.Provider>
  );
}

export const useTemplateBuilder = () => {
  const hook = useContext(TemplateBuilderContext);
  if(!hook) return {
    templateDetails: templateDetailsInitialValues,
    collectionDetails: collectionDetailsInitialValues,
    appendRow: (columnsCount: number) => undefined,
    removeRow: (index: number) => undefined,
    updateColumn: (
      rowIndex: number,
      columnIndex: number,
      updateQuery: Partial<TemplateComponent>
    ) => undefined,
    ...AddFieldModalController()
  }
  return hook;
}
