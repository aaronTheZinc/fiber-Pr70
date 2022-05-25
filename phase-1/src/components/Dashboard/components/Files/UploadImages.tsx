const React = require("react");
const Uppy = require("@uppy/core");
const Tus = require("@uppy/tus");
const GoogleDrive = require("@uppy/google-drive");

const {
  Dashboard,
  DashboardModal,
  DragDrop,
  ProgressBar,
  FileInput,
} = require("@uppy/react");
const { useState } = require("react");

const UploadImages = () => {
  const [open, setOpen] = useState(false);
  const [showInlineDashboard, setShowInlineDashboard] = useState(true);

  const uppy = new Uppy({ id: "uppy", autoProceed: false, debug: true })
    .use(Tus, { endpoint: "/api/uppy" })
    .use(GoogleDrive, { companionUrl: "https://companion.uppy.io" });

  uppy.on("complete", (result) => {
    console.log("Upload complete! We’ve uploaded these files:", result);
  });

  /* const uppy2 = new Uppy({ id: "uppy2", autoProceed: false, debug: true }).use(
    Tus,
    { endpoint: "https://tusd.tusdemo.net/files/" }
  );

  function handleModalClick() {
    setOpen(!open);
  }
 */
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
      {showInlineDashboard && (
        <Dashboard
          uppy={uppy}
          plugins={["GoogleDrive"]}
          metaFields={[{ id: "name", name: "Name", placeholder: "File name" }]}
        />
      )}

      {/*   <h2>Modal Dashboard</h2>
      <div>
        <button onClick={handleModalClick}>
          {open ? "Close dashboard" : "Open dashboard"}
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
      />

      <h2>Progress Bar</h2>
      <ProgressBar uppy={uppy} hideAfterFinish={true} />

      <h2>File Input</h2>
      <FileInput uppy={uppy} /> */}
    </div>
  );
};

export default UploadImages;
