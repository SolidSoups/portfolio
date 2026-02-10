import "./Skills.css";
export default function Skills() {
  const langs = ["C++", "C#", "Lua", "Javascript", "GLSL", "Bash", "CMake"];
  const libs = ["GLFW", "Glad (OpenGL)", "SDL", "ImGui", "STB", "Rapidjson"];
  const tools = ["Unity", "Unreal", "Git CLI", "Perforce", "GDB", "CMake"];

  return (
    <div className="skills-panel aero-div-light">
      <h1 className="div-header">Primary Skills</h1>
      <div className="skills-div">
        <h1 className="skill-header">LANGUAGES</h1>
        <div className="langs-div">
          {langs.map((item) => (
            <p className="lang-item aero-div-blue">{item}</p>
          ))}
        </div>

        <h1 className="skill-header">LIBRARIES</h1>
        <div className="langs-div">
          {libs.map((item) => (
            <p className="lang-item aero-div-yellow">{item}</p>
          ))}
        </div>

        <h1 className="skill-header">TOOLS</h1>
        <div className="langs-div">
          {tools.map((item) => (
            <p className="lang-item aero-div-red">{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
