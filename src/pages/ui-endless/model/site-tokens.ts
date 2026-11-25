import tokensCss from "../../../shared/styles/tokens.css?raw";
import { measureContrast, parseThemeTokens } from "../../../entities/generated-component";

/** The colour tokens of this site in both modes, read from the stylesheet the site itself loads. */
export const SITE_TOKENS = parseThemeTokens(tokensCss);
export const SITE_CONTRAST = measureContrast(SITE_TOKENS);
