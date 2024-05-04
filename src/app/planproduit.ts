export class Planproduit {
    id?: number;  // L'identifiant du plan produit
  idProduitFini: number = 0;  // ID du produit fini associé
  matieres: Map<number, number> | undefined;  // Carte des matières premières (clé : ID de la matière, valeur : quantité)
  quantitetotal: number=0;
}
