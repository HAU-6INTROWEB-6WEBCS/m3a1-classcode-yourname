// Adapted from the course engine's INTROWEB m1a1 Vitest/jsdom checks.
// See NOTICE for source attribution and license information.
import { describe, expect, it } from "vitest"
import { existsSync, readFileSync } from "node:fs"
import { JSDOM } from "jsdom"

const src = new URL("../src/", import.meta.url)
const html = existsSync(new URL("index.html", src)) ? readFileSync(new URL("index.html", src), "utf8") : ""
const page = new JSDOM(html).window.document
const identity = JSON.parse(readFileSync(new URL("../student.json", import.meta.url), "utf8"))
const meta = (name) => page.querySelector(`head meta[name="${name}"]`)?.getAttribute("content")?.trim() ?? ""
const sheet = () => [...page.querySelectorAll("head link[rel~=stylesheet]")].map((l) => l.getAttribute("href") ?? "")
const comments = () => {
  const w = page.createTreeWalker(page, 128); let n = 0
  while (w.nextNode()) n++
  return n
}

const skeleton = () => {
  it("declares the HTML5 doctype, English and UTF-8", () => {
    expect(page.doctype?.name.toLowerCase(), "Start with <!DOCTYPE html>.").toBe("html")
    expect(page.documentElement.getAttribute("lang"), "Set lang=\"en\".").toBe("en")
    expect(page.querySelector("head meta[charset]")?.getAttribute("charset")?.toLowerCase()).toBe("utf-8")
  })
  it("has a viewport meta element and a meta description", () => {
    expect(meta("viewport"), "Add the viewport meta element.").toMatch(/width=device-width/)
    expect(meta("description").length, "Write a meta description.").toBeGreaterThan(10)
  })
}

describe("M3A1: Recipe Card", () => {
  skeleton()
  it("has a title and one h1", () => {
    expect(page.title.trim().length, "Name the dish in the title.").toBeGreaterThan(3)
    expect(page.querySelectorAll("h1").length, "Use exactly one h1.").toBe(1)
  })
  it("shows an image with alt text and a size", () => {
    const img = page.querySelector("main img")
    expect(img, "Add the dish image inside main.").not.toBeNull()
    expect(img?.getAttribute("alt")?.trim().length ?? 0, "Describe the image in alt.").toBeGreaterThan(5)
    expect(img?.getAttribute("width") && img?.getAttribute("height"), "Give the image a width and a height.").toBeTruthy()
  })
  it("lists ingredients in a ul and steps in an ol", () => {
    expect(page.querySelectorAll("ul > li").length, "List three or more ingredients.").toBeGreaterThanOrEqual(3)
    expect(page.querySelectorAll("ol > li").length, "Number three or more steps.").toBeGreaterThanOrEqual(3)
  })
  it("quotes a cooking tip in a blockquote", () => {
    expect(page.querySelector("blockquote")?.textContent.trim().length ?? 0, "Add the tip in a blockquote.").toBeGreaterThan(5)
  })
  it("writes the special characters as references", () => {
    expect(html, "Write the copyright sign as &copy;.").toContain("&copy;")
    expect(html, "Write the degree sign as &deg;.").toContain("&deg;")
  })
})

describe("Student identity in your private copy", () => {
  it("contains the required details as non-empty text", () => {
    for (const field of ["fullName", "studentNumber", "studentEmail", "classCode", "githubAccount", "room", "pcNumber"]) {
      expect(typeof identity[field], `Keep ${field} as text.`).toBe("string")
      expect(identity[field]?.trim(), `Fill in ${field} in student.json.`).toBeTruthy()
    }
  })

  it("uses class code 2006", () => {
    expect(identity.classCode).toBe("2006")
  })
})
