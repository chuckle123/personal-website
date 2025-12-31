import Handlebars from "handlebars"
import fs from "fs"
import path from "path"

// Register shared partials from the prompts directory
const PROMPTS_DIR = path.join(process.cwd(), "src/domains/ai/prompts")

function registerPartials() {
  if (!fs.existsSync(PROMPTS_DIR)) return

  const files = fs.readdirSync(PROMPTS_DIR)
  for (const file of files) {
    if (file.endsWith(".hbs")) {
      const partialName = file.replace(".hbs", "")
      const content = fs.readFileSync(path.join(PROMPTS_DIR, file), "utf-8")
      Handlebars.registerPartial(partialName, content)
    }
  }
}

// Register partials on module load
registerPartials()

/**
 * Load and compile a Handlebars template from a file path
 */
export function loadHandlebarsTemplate<T extends Record<string, unknown>>(
  templatePath: string
): (context: T) => string {
  const absolutePath = path.isAbsolute(templatePath)
    ? templatePath
    : path.join(process.cwd(), templatePath)

  const templateContent = fs.readFileSync(absolutePath, "utf-8")
  const compiled = Handlebars.compile(templateContent)

  return (context: T) => compiled(context)
}
