/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import Toolbar from "./toolbar";
import Widebar from "./widebar";
import Editor from "./editor";
import { useComicContext } from "../../../context/comiccontext";
import { useToastContext } from "../../../context/toastcontext";
import * as Styled from "./styles";
import {
    saveComic as saveComicZilean,
    publishComic as publishComicZilean,
} from "../../../util/zileanComic";
import { createImage } from "../../../util/zilean";

interface IEditContext {
    zoom: number;
    setZoom?: React.Dispatch<React.SetStateAction<number>>;
    tool: string;
    setTool?: React.Dispatch<React.SetStateAction<string>>;
    selection: number;
    setSelection?: React.Dispatch<React.SetStateAction<number>>;
    saveComic?: (file: File) => Promise<void>;
    publishComic?: (file: File) => Promise<void>;
}

const EditContext = createContext<IEditContext>({ zoom: 1, tool: "", selection: -1 });

const EditComic: React.FC = () => {
    const router = useRouter();
    const [tool, setTool] = useState("");
    const [selection, setSelection] = useState(-1);
    const [zoom, setZoom] = useState(1);
    const { comic, layers, clearHistory } = useComicContext();
    const { addToast } = useToastContext();

    const saveComic = async (file: File) => {
        if (!comic || !layers) return;
        let form = new FormData();
        form.append("image", file);
        form.append("directory", "thumbnails");
        form.append("name", file.name.split(".")[0]);
        const image = await createImage(form);

        const updatedComic = { ...comic, layers };
        updatedComic.renderedImage = image.data.imageURL;
        const res = await saveComicZilean(updatedComic);
        if (!res.error && res.data) {
            addToast("success", "Successfully Saved!");
            if (clearHistory) clearHistory();
            return;
        } else {
            addToast("error", "Unable to Save Comic.");
            console.log(res);
        }
    };

    const publishComic = async (file: File) => {
        if (!comic) return;
        let form = new FormData();
        form.append("image", file);
        form.append("directory", "thumbnails");
        form.append("name", file.name.split(".")[0]);
        const res = await createImage(form);
        if (res.data && !res.error) {
            await publishComicZilean(comic._id, res.data.imageURL);
            router.push("/comic/my");
        }
    };

    return (
        <EditContext.Provider
            value={{
                zoom,
                setZoom,
                tool,
                setTool,
                selection,
                setSelection,
                saveComic,
                publishComic,
            }}
        >
            <Styled.EditorOuter>
                <Styled.EditorInner>
                    <Toolbar />
                    <Widebar />
                    <Editor />
                </Styled.EditorInner>
            </Styled.EditorOuter>
        </EditContext.Provider>
    );
};

export const useEditContext = () => useContext(EditContext);

export default EditComic;
