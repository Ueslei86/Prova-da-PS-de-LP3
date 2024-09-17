"use strict";
var __decorate = (this && this.__decorate) || function (decoradores, alvo, chave, desc) {
    var c = arguments.length, r = c < 3 ? alvo : desc === null ? desc = Object.getOwnPropertyDescriptor(alvo, chave) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decoradores, alvo, chave, desc);
    else for (var i = decoradores.length - 1; i >= 0; i--) if (d = decoradores[i]) r = (c < 3 ? d(r) : c > 3 ? d(alvo, chave, r) : d(alvo, chave)) || r;
    return c > 3 && r && Object.defineProperty(alvo, chave, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produto = void 0;
const typeorm_1 = require("typeorm");

let Produto = class Produto {
};
exports.Produto = Produto;

__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Produto.prototype, "id", void 0);

__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Produto.prototype, "descricao", void 0);

__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Produto.prototype, "perecivel", void 0);

exports.Produto = Produto = __decorate([
    (0, typeorm_1.Entity)()
], Produto);
