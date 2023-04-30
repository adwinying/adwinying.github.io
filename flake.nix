{
  description = "adwinying.github.io";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/master";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShell = with pkgs; mkShell {
        buildInputs = [
          nodejs_16
          nodePackages.pnpm
        ];

        shellHook = ''
          echo "node: `${pkgs.nodejs_16}/bin/node --version`"
          echo "pnpm: v`${pkgs.nodePackages.pnpm}/bin/pnpm --version`"
        '';
      };
    });
}
