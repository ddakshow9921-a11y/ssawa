$ErrorActionPreference = "Stop"
$projectRoot = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")
$node = "C:\Users\zipco\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
Set-Location -LiteralPath $projectRoot.Path
& $node "node_modules/typescript/bin/tsc" "--noEmit"
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}
& $node "node_modules/vite/bin/vite.js" "build"
exit $LASTEXITCODE
