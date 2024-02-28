import execa from "execa";
import { SuccessResponse } from "./types";

function lineParser(line: string) {
  try {
    const data = JSON.parse(line);
    if (data && data.command_output) {
      return data;
    }
  } catch (e) {}
}

export function buildCommandRunner(
  executablePath: string,
  defaultArgs: string[]
) {
  return async <ValueType extends SuccessResponse>(
    args: string[]
  ): Promise<ValueType> => {
    const { stdout } = await execa(executablePath, [...defaultArgs, ...args]);
    for (const line of stdout.split("\n")) {
      const parsed = lineParser(line);
      if (parsed) {
        return parsed;
      }
    }

    throw new Error(`Did not receive output: \n${stdout}`);
  };
}
