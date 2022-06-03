const React = require("react");
const Uppy = require("@uppy/core");
const Tus = require("@uppy/tus");
const GoogleDrive = require("@uppy/google-drive");
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

const {
  Dashboard,
  DashboardModal,
  DragDrop,
  ProgressBar,
  FileInput,
} = require("@uppy/react");
const { useState } = require("react");
/* const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhYXNnMm1vMm1iZ3Q0MGNtcDEwIiwiYWNjb3VudF90eXBlIjoia2QiLCJleHAiOjE2NTQ2MTYzNjR9.nl_gxrpAMF85BkcId2qaHjt0rjSKwfn6GkxhYuoEEpQ"; */
const UploadImages = ({ refetch }) => {
  const [cookies] = useCookies(["userAuthToken"]);
  console.log("login cookies", cookies);

  const uppy = new Uppy({ id: "uppy", autoProceed: false, debug: true })
    .use(Tus, {
      endpoint: "http://192.168.0.106:7070/files/",
      headers: {
        token: cookies["userAuthToken"],
        "Access-Control-Allow-Origin": "http://localhost:7070",
        "Access-Control-Allow-Headers": "*",
        // "Access-Control-Request-Headers": "*"
      },
      removeFingerprintOnSuccess: true,
    })
    .use(GoogleDrive, { companionUrl: "https://companion.uppy.io" });

  uppy.on("complete", (result) => {
    refetch();
    result.successful.map((res) => {
      toast.success(`Upload ${res.type} successfully`);
    });
  });

  /* const uppy2 = new Uppy({ id: "uppy2", autoProceed: false, debug: true }).use(
    Tus,
    { endpoint: "https://tusd.tusdemo.net/files/" }
  );
 const [open, setOpen] = useState(false);
  function handleModalClick() {
    setOpen(!open);
  } */

  return (
    <div>
      {/* <h1>React Examples</h1>
    
      <label>
        <input
          type="checkbox"
          checked={showInlineDashboard}
          onChange={(event) => {
            showInlineDashboard(event.target.checked);
          }}
        />
        Show Dashboard
      </label> */}

      <Dashboard
        uppy={uppy}
        plugins={["GoogleDrive"]}
        metaFields={[{ id: "name", name: "Name", placeholder: "File name" }]}
      />

      {/*   <h2>Modal Dashboard</h2>
      <div>
        <button onClick={handleModalClick} style={{ color: "red" }}>
          {open ? "Close dashboard" : "Open dashboard"}
          lorem ipsumsodar sit amet
        </button>
        <DashboardModal
          uppy={uppy2}
          open={open}
          // target={document.body}
          onRequestClose={() => setOpen(false)}
        />
      </div>

      <h2>Drag Drop Area</h2>
      <DragDrop
        uppy={uppy}
        locale={{
          strings: {
            chooseFile: "Boop a file",
            orDragDrop: "or yoink it here",
          },
        }}
      /> */}
      {/*
      <h2>Progress Bar</h2>
      <ProgressBar uppy={uppy} hideAfterFinish={true} />

      <h2>File Input</h2>
      <FileInput uppy={uppy} /> */}
    </div>
  );
};

export default UploadImages;

///================== get user data query============================//
/* 
query getUserByToken{
   getUserByToken(token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhYXNpM2VvMm1iZ3Q0MGNtcDIwIiwiYWNjb3VudF90eXBlIjoia2QiLCJleHAiOjE2NTQ2MDg0NzZ9.HEtDH6JIu4__G6Wp5JitUtpVkQYCuo3BQTVe_JF1EwU") {
      id
      email
      username
      files{
        files{
          file_name
          id
          uri
          file_type
          file_size
        }
      }
      vreel {
        author
        slides {
          id
          slide_location
          content_type
          uri
          title { n
            description
          }
          mobile {
            start_time
            stop_time
            background_audio_uri
            uri
            content_type
          }
          desktop {
            start_time
            stop_time
            background_audio_uri
            uri
            content_type
          }
          cta1 {
            link_header
            link_type
            link_url
          }
          cta2 {
            link_header
            link_type
            link_url
          }
      
        }
      }
    }
}
 */
