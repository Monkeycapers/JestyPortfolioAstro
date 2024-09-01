export default class ThemeHelper {
  private theme: string;

  private static readonly LIGHT_THEME = "light";
  private static readonly DARK_THEME = "dark";
  private static readonly DEFAULT_THEME = ThemeHelper.LIGHT_THEME;

  constructor(theme: string = "") {
    this.theme = theme;
    if (!this.theme.length) {
      this.initTheme();
    }
  }

  public initTheme() {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      this.theme = localStorage.getItem("theme") ?? ThemeHelper.DEFAULT_THEME;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      this.theme = ThemeHelper.DARK_THEME;
    } else {
      this.theme = ThemeHelper.DEFAULT_THEME;
    }
    this.applyTheme();
  }

  public setTheme(theme: string) {
    this.theme = theme;
    this.applyTheme();
  }

  public getTheme() {
    return this.theme;
  }

  private applyTheme() {
    document.documentElement.setAttribute("data-theme", this.theme);
  }
}
