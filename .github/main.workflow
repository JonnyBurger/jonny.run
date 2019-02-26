workflow "Install and Test" {
  on = "push"
  resolves = ["Test"]
}

action "Build" {
  uses = "JonnyBurger/actions-yarn@master"
  args = "install"
}

action "Test" {
  needs = "Build"
  uses = "JonnyBurger/actions-yarn@master"
  args = ["run", "deploy"]
}
