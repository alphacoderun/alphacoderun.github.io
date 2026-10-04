# init lua config

```
vim.lsp.enable('pyright')
vim.lsp.enable('gopls')
vim.lsp.enable('html')
vim.lsp.inlay_hint.enable(true)
vim.lsp.codelens.enable(true)

vim.opt.completeopt = "menu,menuone,noselect,popup,fuzzy"
vim.o.autocomplete = true
vim.o.complete = ".,w,b,o"
vim.o.autocompletedelay = 250


vim.api.nvim_create_autocmd("LspAttach", {
  group = vim.api.nvim_create_augroup("lsp_completion", { clear = true }),
  callback = function(args)
    local client_id = args.data.client_id
    if not client_id then
                return
        end
        local_client = vim.lsp.get_client_by_id(client_id)
                if client and client:supports_method("textDocument/completion") then
                        vim.lsp.completion.enable(true, client_id, args.buf, {
                                autotrigger = true,
                        })
                end
        end,
})
```
