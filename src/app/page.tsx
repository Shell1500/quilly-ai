"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFeatherPointed,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import useProgress from "../../hooks/progress";

export default function Home() {
  const [selectedButton, setSelectedButton] = useState("1");
  const [isFileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isUserSubmitted, setUserSubmitted] = useState(false);
  const [recvdFile, setRecvdFile] = useState(true);
  const [fileForProcessing, setFileForProcessing] = useState<File | null>(null);
  const handleButtonClick = (buttonID: any) => {
    console.log(buttonID);
    setSelectedButton(buttonID);
  };
  const { start, done } = useProgress();
  const buttonClass = (buttonID: any) =>
    `w-48 h-12 text-gray-400 hover:text-white border border-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  ${
      selectedButton === buttonID ? "ring-2 ring-green-700 border-none" : ""
    }`;

  const handleFileUpload = (file: any) => {
    if (file && file.length > 0) {
      const fileToProcess = file[0];
      console.log("Selected file: ", fileToProcess);
      setFileUploaded(true);
      setFileName(fileToProcess.name);
      setFileForProcessing(fileToProcess);
    }
  };

  const handleSubmit = async () => {
    console.log(selectedButton);
    if (!fileForProcessing) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileForProcessing);
    formData.append("buttonID", selectedButton);

    try {
      const formData = new FormData();
      formData.append("file", fileForProcessing);
      formData.append("buttonID", selectedButton);

      start();
      const response = await axios.post(
        "http://127.0.0.1:8080/process",
        formData,
        {
          responseType: "arraybuffer",
        }
      );

      if (response.status === 200) {
        console.log(response);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `quilly_${fileName}`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    } finally {
      done();
    }
  };

  const downloadFile = () => {};

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-950">
      <div className="flex flex-col w-3/5">
        <div className="main-title justify-center">
          <div className="flex flex-row justify-center">
            <p className="montserrat-900 text-4xl">
              Welcome to <span className="text-green-700">Quilly AI</span>
            </p>
            <div className="ml-4">
              <FontAwesomeIcon
                icon={faFeatherPointed}
                size="lg"
                className="w-10 h-10 text-white"
              />
            </div>
          </div>

          <p className="montserrat-700 text-sm mt-4 text-center">
            Quilly is your AI companion for writing{" "}
            <span className="text-green-700">unique</span> and{" "}
            <span className="text-green-700">thoughtful</span> product
            descriptions for your business.
          </p>
        </div>

        <div className="mt-10 border-t-2 border-gray-800 pt-8">
          <p className="text-left text-3xl montserrat-800 ">Introduction</p>
          <p className="mt-4 p-4 text-left text-sm montserrat-700 rounded-3xl bg-gray-800">
            Quilly works by reading your product specifications from an{" "}
            <span className="text-green-700">Excel</span> spreadsheet. For each
            product specification you provide, Quilly creates a new,{" "}
            <span className="text-green-700">custom</span> product description.
            Quilly then provides those new product descriptions back to you in
            an updated Excel sheet for
            <span className="text-green-700"> easy uploading</span> into your
            ERP, marketing, or other product databases.
          </p>
        </div>

        <div className="mt-10 border-t-2 border-gray-800 pt-8">
          <p className="text-left text-3xl montserrat-800">
            {" "}
            <span className="underline">Step 1:</span> Choose your processing.
          </p>
          <div className="flex flex-row justify-between mt-4 montserrat-700 p-4">
            <button
              type="button"
              className={buttonClass("1")}
              onClick={() => handleButtonClick("1")}
            >
              Summary + Bullets
            </button>
            <button
              type="button"
              className={buttonClass("2")}
              onClick={() => handleButtonClick("2")}
            >
              Summary only
            </button>
            <button
              type="button"
              className={buttonClass("3")}
              onClick={() => handleButtonClick("3")}
            >
              Bullets only
            </button>
          </div>
          <div className="mt-6 border-t-2 border-gray-800 pt-8">
            <p className="text-left text-3xl montserrat-800">
              {" "}
              <span className="underline">Step 2:</span> Upload your Excel
              spreadsheet.
            </p>
            <div className="flex mt-4 justify-center items-center p-4">
              <div className="w-3/5 flex justify-center items-center">
                {!isFileUploaded && (
                  <label
                    className={`${buttonClass(
                      "button"
                    )} h-auto w-auto cursor-pointer`}
                  >
                    <input
                      type="file"
                      className="hidden"
                      accept=".xlsx, .xls, .csv"
                      onChange={(e) => handleFileUpload(e.target.files)}
                    ></input>
                    <div className="flex flex-col items-center">
                      <p className="mb-4 montserrat-700 text-sm">
                        Upload your product spreadsheet.
                      </p>
                      <FontAwesomeIcon
                        icon={faFileExcel}
                        className="w-10 h-10"
                        size="lg"
                      />
                      <p className="mt-4 montserrat-700 text-xs">
                        <span className="underline">Type:</span> xlsx, xls, csv
                      </p>
                    </div>
                  </label>
                )}

                {isFileUploaded && (
                  <label
                    className={`${buttonClass(
                      "button"
                    )} h-auto w-auto cursor-pointer`}
                  >
                    <input
                      type="file"
                      className="hidden"
                      accept=".xlsx, .xls, .csv"
                      onChange={(e) => handleFileUpload(e.target.files)}
                    ></input>
                    <div className="flex flex-col items-center">
                      <p className="mb-4 montserrat-700 text-sm">
                        File uploaded: {fileName}
                      </p>
                      <FontAwesomeIcon
                        icon={faFileExcel}
                        className="w-10 h-10 mb-2"
                        size="lg"
                      />
                    </div>
                  </label>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-6 border-t-2 border-gray-800 pt-8">
            <div>
              <p className="text-left text-3xl montserrat-800">
                <span className="underline">Step 3:</span> Submit to Quilly.
              </p>
              <p className="mt-4 p-4 text-left text-sm montserrat-700 rounded-3xl bg-gray-800">
                Once <span className="text-red-600">ready</span>, press{" "}
                <span className="text-green-700">'Submit'</span> and Quilly will
                get to work writing your new product descriptions. Your results
                will be available for download below.
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="button"
                className={`${buttonClass(
                  "button2"
                )} bg-green-700 text-white hover:bg-green-500 montserrat-700`}
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center mt-6 border-t-2 border-gray-800 pt-8">
            <div>
              <p className="text-left text-3xl montserrat-800">
                <span className="underline">Step 4:</span> Download your file!
              </p>
              <p className="mt-4 p-4 text-left text-sm montserrat-700 rounded-3xl bg-gray-800">
                Your updated file with new product descriptions will be
                available for download here once complete.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center mt-4">
              <button
                type="button"
                className={`${buttonClass("button2")} montserrat-700 ${
                  recvdFile && isUserSubmitted
                    ? "text-white bg-green-700"
                    : "opacity-50 cursor-not-allowed"
                }`}
                onClick={() => downloadFile()}
              >
                Download
              </button>

              {!recvdFile && (
                <TailSpin
                  visible={true}
                  height="20"
                  width="20"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass="mt-4"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
