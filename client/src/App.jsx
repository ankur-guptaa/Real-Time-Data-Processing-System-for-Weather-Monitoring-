import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <div className=" w-screen bg-blue-600 text-white flex gap-8 p-4">
        <button
          onClick={() => {
            navigate("/create_rule");
          }}
        >
          Create Rule
        </button>
        <button
          onClick={() => {
            navigate("/combine_rules");
          }}
        >
          Combine Rule
        </button>
        <button
          onClick={() => {
            navigate("/evaluate_rule");
          }}
        >
          Evaluate Rule
        </button>
      </div>
      <Routes>
        <Route
          path="/*"
          element={<Navigate to="/evaluate_rule"></Navigate>}
        ></Route>
        <Route path="/create_rule" element={<CreateRule />}></Route>
        <Route path="/combine_rules" element={<CombineRules />}></Route>
        <Route path="/evaluate_rule" element={<EvaluateRule />}></Route>
      </Routes> */}
    </div>
  )
}

export default App
