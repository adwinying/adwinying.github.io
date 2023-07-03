{
  description = "adwinying.github.io";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/master";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system: let
      overlay = final: prev: { nodejs = prev.nodejs_18; };
      pkgs = nixpkgs.legacyPackages.${system}.extend overlay;
    in {
      devShell = with pkgs; mkShell {
        buildInputs = [
          nodejs_18
          nodePackages.pnpm
        ];

        shellHook = ''
          echo "node: `${pkgs.nodejs_18}/bin/node --version`"
          echo "pnpm: v`${pkgs.nodePackages.pnpm}/bin/pnpm --version`"
        '';
      };
    });
}
